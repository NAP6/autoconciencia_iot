import { Request, Response } from "express";
import { database2 } from "../../data/database2";
import { Goal } from "../../models/selfAwarness/Goal";
import { SelfAwarenessAspectQ } from "../../models/selfAwarness/qwertyModels/SelfAwarenessAspectQ";
import {
  GoalQ,
  SelfAwarenessProcessQ,
  SelfAwarnessQ,
} from "../../models/selfAwarnessModels";

var modelID: any;
//var routes: any;

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
    await add_goal(principa_system);
    await add_SelfAwarenessProcess(principa_system);
    await add_SelfAwarenessAspect(principa_system, "//@containsIoTSystem.0");
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
    await add_goal(system[i]);
    await add_SelfAwarenessProcess(system[i]);
    await add_SelfAwarenessAspect(system[i], actual_path);
    if (system[i].containsIoTSubSystem)
      await recursive_span(system[i].containsIoTSubSystem, actual_path);
  }
}

async function add_goal(span: any) {
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

async function add_SelfAwarenessProcess(span: any) {
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
    arr_insert_process.push(process[i].toObjectG());
    //si es pre o re /flexivo
    //	agregar para pre
    //si o
    //	agregar para re
  }
  if (arr_insert_process.length > 0)
    span.constainsSelfAwarenessProcess = arr_insert_process;
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
      arr_insert_aspects.length - 1,
      span.containsGoal,
      span_path
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
  aspect_inx: any,
  list_of_goals: any,
  path: any
) {
  var db = new database2();
  var rows = await db.qwerty(
    `SELECT obj_id from aspectoautoconsciencia where aa_id=${aspect.$.id}`
  );
  rows = rows[0];
  for (var i = 0; i < list_of_goals.length; i++) {
    if (rows.obj_id == list_of_goals[i].$.id) {
      aspect.isUsedToCalculate = `${path}/@containsGoal.${i}`;
      if (list_of_goals[i].isCalculatedBy)
        list_of_goals[
          i
        ].isCalculatedBy += ` ${path}/@constainsSelfAwarenessAspect.${aspect_inx}`;
      else
        list_of_goals[
          i
        ].isCalculatedBy = `${path}/@constainsSelfAwarenessAspect.${aspect_inx}`;
      //routes['aspect'][`${aspect.$.id}`] = list_of_goals[i].isCalculatedBy;
    }
  }
}

async function add_scale(model: any) {
  var db = new database2();
}

async function add_scope(model: any) {
  if (model["containsEntity"]) {
    var containsEntity = model["containsEntity"];
    recursive_scope(containsEntity, "//@containsEntity");
  }
}

async function recursive_scope(scope_list, path) {
  for (var i = 0; i < scope_list.length; i++) {
    var actual_path = `${path}.${i}`;
    await add_relation_scope_selfAweranessAspect(scope_list[i], actual_path);
    if (scope_list[i].containsSubPhysicalEntity) {
      await recursive_scope(
        scope_list[i].containsSubPhysicalEntity,
        `${actual_path}/@containsSubPhysicalEntity`
      );
    }
    if (scope_list[i].containsComputingNode) {
      await recursive_scope(
        scope_list[i].containsComputingNode,
        `${actual_path}/@containsComputingNode`
      );
    }
    if (scope_list[i].containsResource) {
      await recursive_scope(
        scope_list[i].containsResource,
        `${actual_path}/@containsResource`
      );
    }
  }
}

async function add_relation_scope_selfAweranessAspect(scope, path) {
  var db = new database2();
  var rows = await db.qwerty(
    `select aa_id from aspectoautoconsciencia_objeto where obj_id=${scope.$.id} and ma_id=${modelID}`
  );

  for (var i = 0; i < rows.length; i++) {
    await recursive_relation_scope_selfAweranessAspect(
      rows[i].aa_id,
      scope,
      path
    );
  }
}

async function recursive_relation_scope_selfAweranessAspect(
  aspect_id,
  scope,
  scope_path
) {
  console.log("\n\n################################\n\tElementos");
  console.log(`ID del Aspecto: ${aspect_id}`);
  //console.log(`Path del Aspecto: ${routes['aspect'][`${aspect_id}`]}`);
  console.log(`Path del Objeto: ${scope_path}`);
  console.log(`El objeto ${scope.$.id} tiene de nombre ${scope.$.name}`);

}
