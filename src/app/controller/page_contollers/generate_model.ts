import { Decipher } from "crypto";
import { Request, Response } from "express";
import { database2 } from "../../data/database2";
import { Goal } from "../../models/selfAwarness/Goal";
import {
  CollectionMethodQ,
  GoalQ,
  SelfAwarenessProcessQ,
  SelfAwarnessQ,
  ReflectiveProcessQ,
  AnalysisModelQ,
  CalculationMethodQ,
  DecisionCriteriaQ,
  SelfAwarenessAspectQ,
} from "../../models/selfAwarnessModels";

var modelID: any;
var routes: any = {
  aspect: {},
  goal: {},
  analisisModel: {},
  decisionCriteria: {},
};

export async function generate_model(req: Request, res: Response) {
  modelID = req.session?.active_model.modelID;
  var db = new database2();
  var modelo: SelfAwarnessQ = new SelfAwarnessQ(-1, "", "", "", "");
  var rows = await db.qwerty(
    modelo.toSqlSelect(["/@/MODEL/@/"], [modelID.toString()])
  );

  modelo = modelo.toObjectArray(rows)[0];
  var modeloA = JSON.parse(modelo.architectureModel);
  await add_span(modeloA[Object.keys(modeloA)[0]]);
  await add_scope(modeloA[Object.keys(modeloA)[0]]);
  await add_decision_criteria(modeloA[Object.keys(modeloA)[0]]);
  await add_scale(modeloA[Object.keys(modeloA)[0]]);

  res.render("generate_model", {
    error: req.flash("error"),
    succes: req.flash("succes"),
    session: req.session,
    model: JSON.stringify(modeloA, null, "  "),
  });
}

async function add_span(model: any) {
  if (model["containsIoTSystem"]) {
    var principa_system = model["containsIoTSystem"][0];
    var path = "//@containsIoTSystem.0";
    await add_goal(principa_system, path);
    await add_SelfAwarenessProcess(principa_system, path);
    await add_SelfAwarenessAspect(principa_system, path);
    if (principa_system.containsIoTSubSystem) {
      await recursive_span(
        principa_system.containsIoTSubSystem,
        "//@containsIoTSystem.0"
      );
    }
  }
  model["containsIoTSystem"][0] = principa_system;
}

async function recursive_span(system: any, path: any) {
  for (var i = 0; i < system.length; i++) {
    var actual_path = path + `/@containsIoTSubSystem.${i}`;
    await add_goal(system[i], actual_path);
    await add_SelfAwarenessProcess(system[i], actual_path);
    await add_SelfAwarenessAspect(system[i], actual_path);
    if (system[i].containsIoTSubSystem)
      await recursive_span(system[i].containsIoTSubSystem, actual_path);
  }
}

async function add_goal(span: any, path: string) {
  var db = new database2();
  var goal: GoalQ = new GoalQ(-1, "", "", 0, "");
  var rows = await db.qwerty(
    goal.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [span.$.id, modelID])
  );
  var id_hierarchical = rows.map((row: any) => {
    return { id: row.id, padre: row.padre };
  });
  var list_of_goals = goal.toObjectArray(rows);
  span.containsGoal = order_goals_hierarchical(
    list_of_goals,
    id_hierarchical,
    null
  );
}

function order_goals_hierarchical(
  list_of_goals: Goal[],
  id_hierarchical: { id: any; padre: any }[],
  id_f: any
): Goal[] {
  //Lista de pares seleccionados
  var selected_goals_id = id_hierarchical.filter((goal) => goal.padre == id_f);
  //Lista de pares no seleccionados
  var not_selected_goals_id = id_hierarchical.filter(
    (goal) => goal.padre != id_f
  );
  //id puros seleccionados
  var ids = selected_goals_id.map((goal) => goal.id);
  //retornar si no no hay ids seleccionados
  if (ids.length == 0) return [];
  //Sublista de objetivos seleccionados
  var selected_goals = list_of_goals.filter(
    (goal) => ids.indexOf(goal.id) != -1
  );
  //Sublista de objetivos no seleccionados
  var unselected_goals = list_of_goals.filter(
    (goal) => ids.indexOf(goal.id) == -1
  );
  var result_goals: any[] = [];
  selected_goals.forEach((goal) => {
    var aux_subGoal = order_goals_hierarchical(
      unselected_goals,
      not_selected_goals_id,
      goal.id
    );
    if (aux_subGoal.length > 0) goal.containsSubGoal = aux_subGoal;
    result_goals.push(goal.toObjectG());
  });
  return result_goals;
}

function add_calculatedGoalIndicator(span: any) {
  console.log(span);
}

async function add_SelfAwarenessProcess(span: any, path_span: string) {
  var db = new database2();
  var SelfAwarness: SelfAwarenessProcessQ;
  SelfAwarness = new SelfAwarenessProcessQ(-1, "", "", 0, undefined, undefined);
  var sql = SelfAwarness.toSqlSelect(
    ["/@/SYSTEM/@/", "/@/MODEL/@/"],
    [span.$.id, modelID]
  );
  var rows = await db.qwerty(sql);
  var process: SelfAwarenessProcessQ[] = SelfAwarness.toObjectArray(rows);
  var arr_insert_process: any[] = [];
  for (var i = 0; i < process.length; i++) {
    var new_process = process[i].toObjectG();
    var path_process = `${path_span}/@constainsSelfAwarenessProcess.${i}`;
    arr_insert_process.push(new_process);
    if (process[i].type_process == 17)
      await add_PreReflectiveProcess_extras(new_process, path_process);
    else await add_ReflectiveProcess_extras(new_process, path_process);
  }
  if (arr_insert_process.length > 0)
    span.constainsSelfAwarenessProcess = arr_insert_process;
}

async function add_PreReflectiveProcess_extras(process, path_process) {
  var db = new database2();
  var CollectionMethod: CollectionMethodQ;
  CollectionMethod = new CollectionMethodQ(-1, "");
  var sql = CollectionMethod.toSqlSelect(["/@/PROCES/@/"], [process.$.id]);
  var rows = await db.qwerty(sql);
  var methods: CollectionMethodQ[] = CollectionMethod.toObjectArray(rows);
  if (methods.length > 0) {
    process.usesCollectionMethod = [];
    for (var i = 0; i < methods.length; i++) {
      process.usesCollectionMethod.push(methods[i].toObjectG());
    }
  }
  await add_analisisModel(process, path_process);
}

async function add_ReflectiveProcess_extras(process, path_process) {
  await add_analisisModel(process, path_process);
  var db = new database2();
  var calculationMethod: CalculationMethodQ;
  calculationMethod = new CalculationMethodQ(-1, "", undefined, undefined);
  var sql = calculationMethod.toSqlSelect(["/@/PROCES/@/"], [process.$.id]);
  var rows2 = await db.qwerty(sql);
  var methods: CalculationMethodQ[] = calculationMethod.toObjectArray(rows2);
  if (methods.length > 0) {
    process.usesCalculationMethod = [];
    for (var i = 0; i < methods.length; i++) {
      process.usesCalculationMethod.push(methods[i].toObjectG());
    }
  }
}

async function add_analisisModel(process, path_process) {
  var db = new database2();
  var analisisModel: AnalysisModelQ;
  analisisModel = new AnalysisModelQ(-1, "");
  var sql = analisisModel.toSqlSelect(["/@/PROCES/@/"], [process.$.id]);
  var rows = await db.qwerty(sql);
  var model: AnalysisModelQ[] = analisisModel.toObjectArray(rows);
  if (model.length > 0) {
    process.usesAnalysisModel = [];
    for (var i = 0; i < model.length; i++) {
      routes["analisisModel"][
        `${model[i].id}`
      ] = `${path_process}/@usesAnalysisModel.${i}`;
      process.usesAnalysisModel.push(model[i].toObjectG());
    }
  }
}

async function add_SelfAwarenessAspect(span: any, span_path: any) {
  var db = new database2();
  var SelfAwarness: SelfAwarenessAspectQ;
  SelfAwarness = new SelfAwarenessAspectQ(-1, "", "", 0, undefined);
  var sql = SelfAwarness.toSqlSelect(
    ["/@/MODEL/@/", "/@/SYSTEM/@/"],
    [modelID, span.$.id]
  );
  var rows = await db.qwerty(sql);
  var aspects: SelfAwarenessAspectQ[] = SelfAwarness.toObjectArray(rows);
  var arr_insert_aspects: any[] = [];
  for (var i = 0; i < aspects.length; i++) {
    var new_aspect = aspects[i].toObjectG();
    arr_insert_aspects.push(new_aspect);
    await add_relation_Aspect_Process_SelfAweranes(
      new_aspect,
      arr_insert_aspects.length - 1,
      span.constainsSelfAwarenessProcess,
      span_path
    );
    await add_relation_SelfAweranesAspect_Goals(
      new_aspect,
      span.containsGoal,
      span_path,
      `${span_path}/@constainsSelfAwarenessAspect.${
        arr_insert_aspects.length - 1
      }`
    );
  }
  if (arr_insert_aspects.length > 0)
    span.constainsSelfAwarenessAspect = arr_insert_aspects;
}

async function add_relation_Aspect_Process_SelfAweranes(
  aspect: any,
  aspect_inx: any,
  list_of_process: any,
  path: any
) {
  var db = new database2();
  var rows = await db.qwerty(
    `select pa_id from procesoautoconsciencia where aa_id=${aspect.$.id}`
  );
  for (var i = 0; i < rows.length; i++) {
    for (var j = 0; j < list_of_process.length; j++) {
      if (rows[i].pa_id == list_of_process[j].$.id) {
        if (aspect.iscaptured)
          aspect.iscaptured += ` ${path}/@constainsSelfAwarenessProcess.${i}`;
        else aspect.iscaptured = path + `/@constainsSelfAwarenessProcess.${i}`;
        list_of_process[j].captures =
          path + `/@constainsSelfAwarenessAspect.${aspect_inx}`;
      }
    }
  }
}
async function add_relation_SelfAweranesAspect_Goals(
  aspect: any,
  list_of_goals: any,
  path_goals: any,
  path_aspect: any
) {
  var db = new database2();
  var rows = await db.qwerty(
    `SELECT obj_id from aspectoautoconsciencia where aa_id=${aspect.$.id}`
  );
  rows = rows[0];
  var goal_tag = "";
  if (path_goals.indexOf("containsGoal") === -1) goal_tag = "containsGoal";
  else goal_tag = "containsSubGoal";
  for (var i = 0; i < list_of_goals.length; i++) {
    var actual_goal_path = `${path_goals}/@${goal_tag}.${i}`;
    if (rows.obj_id == list_of_goals[i].$.id) {
      aspect.isUsedToCalculate = actual_goal_path;
      if (list_of_goals[i].isCalculatedBy) {
        list_of_goals[i].isCalculatedBy += ` ${path_aspect}`;
      } else {
        list_of_goals[i].isCalculatedBy = path_aspect;
      }
    }
    routes["goal"][`${list_of_goals[i].$.id}`] = actual_goal_path;
    if (list_of_goals[i].containsSubGoal) {
      await add_relation_SelfAweranesAspect_Goals(
        aspect,
        list_of_goals[i].containsSubGoal,
        actual_goal_path,
        path_aspect
      );
    }
  }
  routes["aspect"][`${aspect.$.id}`] = path_aspect;
}

async function add_scale(model: any) {
  var db = new database2();
}

async function add_scope(model: any) {
  if (model["containsEntity"]) {
    var containsEntity = model["containsEntity"];
    await recursive_scope(containsEntity, "//@containsEntity", model);
  }
}

async function recursive_scope(scope_list, path, model) {
  for (var i = 0; i < scope_list.length; i++) {
    var actual_path = `${path}.${i}`;
    await add_relation_scope_selfAweranessAspect(
      scope_list[i],
      actual_path,
      model
    );
    if (scope_list[i].containsSubPhysicalEntity) {
      await recursive_scope(
        scope_list[i].containsSubPhysicalEntity,
        `${actual_path}/@containsSubPhysicalEntity`,
        model
      );
    }
    if (scope_list[i].containsComputingNode) {
      await recursive_scope(
        scope_list[i].containsComputingNode,
        `${actual_path}/@containsComputingNode`,
        model
      );
    }
    if (scope_list[i].containsResource) {
      await recursive_scope(
        scope_list[i].containsResource,
        `${actual_path}/@containsResource`,
        model
      );
    }
  }
}

async function add_relation_scope_selfAweranessAspect(scope, path, model) {
  var db = new database2();
  var rows = await db.qwerty(
    `select aa_id from aspectoautoconsciencia_objeto where obj_id=${scope.$.id} and ma_id=${modelID}`
  );

  for (var i = 0; i < rows.length; i++) {
    await recursive_relation_scope_selfAweranessAspect(
      rows[i].aa_id,
      scope,
      path,
      model
    );
  }
}

async function recursive_relation_scope_selfAweranessAspect(
  aspect_id,
  scope,
  scope_path,
  model
) {
  var route = routes["aspect"][`${aspect_id}`];
  route = route.substring(3, route.length);
  route = route.split("/@").reverse();
  var aspect_obj = recursive_element(route, model);
  aspect_obj.belongsTo = scope_path;
  if (scope.has) scope.has += " " + routes["aspect"][`${aspect_id}`];
  else scope.has = routes["aspect"][`${aspect_id}`];
}

function recursive_element(arr_path, sub_model) {
  if (arr_path.length > 0) {
    var redireccion = arr_path.pop();
    redireccion = redireccion.split(".");
    var sub_elemento = sub_model[redireccion[0]][parseInt(redireccion[1])];
    return recursive_element(arr_path, sub_elemento);
  }
  return sub_model;
}

async function add_decision_criteria(model: any) {
  await add_decision_criteria_relationed_goal(model);
  await add_decision_criteria_relationed_analysisModel();
}

async function add_decision_criteria_relationed_goal(model: any) {
  if (!model.containsDecisionCriteria) model.containsDecisionCriteria = [];
  var db = new database2();
  var list_id_goals = Object.keys(routes["goal"]);
  var decisionCriteria: DecisionCriteriaQ = new DecisionCriteriaQ(-1, "", "");
  for (var i = 0; i < list_id_goals.length; i++) {
    var sql = decisionCriteria.toSqlSelect(
      ["/@/OBJECT/@/"],
      [list_id_goals[i]]
    );
    var rows = await db.qwerty(sql);
    var criteria: DecisionCriteriaQ[] = decisionCriteria.toObjectArray(rows);
    if (criteria.length > 0) {
      if (routes["decisionCriteria"][criteria[0].id.toString()]) {
        var indx_criteria = parseInt(
          routes["decisionCriteria"][criteria[0].id.toString()].split(".")[1]
        );
        model.containsDecisionCriteria[indx_criteria].interprets +=
          " " + routes["goal"][list_id_goals[i]];
      } else {
        model.containsDecisionCriteria.push(criteria[0].toObjectG());
        var indx_criteria = model.containsDecisionCriteria.length - 1;
        routes["decisionCriteria"][
          criteria[0].id.toString()
        ] = `//@containsDecisionCriteria.${indx_criteria}`;
        model.containsDecisionCriteria[indx_criteria].interprets =
          routes["goal"][list_id_goals[i]];
      }
      var path_goals_list = routes["goal"][list_id_goals[i]]
        .replace("//@", "")
        .split("/@")
        .reverse();
      add_relation_goal_decisionCriteria(
        model,
        path_goals_list,
        routes["decisionCriteria"][criteria[0].id.toString()]
      );
    }
  }
}

function add_relation_goal_decisionCriteria(
  model: any,
  path_goals: string[],
  path_criteria: string
) {
  var next_path = path_goals.pop();
  if (next_path) {
    var next_path_l: any[] = next_path.split(".");
    add_relation_goal_decisionCriteria(
      model[next_path_l[0]][parseInt(next_path_l[1])],
      path_goals,
      path_criteria
    );
  } else {
    model.isInterpretedBy = path_criteria;
  }
}

async function add_decision_criteria_relationed_analysisModel() {}
