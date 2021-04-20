import { Request, Response, NextFunction } from "express";
import { database2 } from "../../data/database2";
import { Goal } from "../../models/selfAwarness/Goal";
import { GoalQ, SelfAwarnessQ } from "../../models/selfAwarnessModels";

var modelID;

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
  console.log(modeloA);

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
    await add_goal(principa_system.$);
    if (principa_system.containsIoTSubSystem) {
      await recursive_span(principa_system.containsIoTSubSystem);
    }
  }
}

async function recursive_span(system) {
  await system.forEach(async (subSystem) => {
    await add_goal(subSystem.$);
    if (subSystem.containsIoTSubSystem) {
      await recursive_span(subSystem.containsIoTSubSystem);
    }
  });
}

async function add_goal(span) {
  var db = new database2();
  var goal: GoalQ = new GoalQ(-1, "", "", 0, "");
  var rows = await db.qwerty(
    goal.toSqlSelect(["/@/SYSTEM/@/", "/@/MODEL/@/"], [span.id, modelID])
  );
  var id_hierarchical = rows.map((row) => {
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
  id_f
): Goal[] {
  //Lista de pares seleccionados
  console.log(typeof id_hierarchical[0].padre);
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
  selected_goals.forEach((goal) => {
    goal.containsSubGoal = order_goals_hierarchical(
      unselected_goals,
      not_selected_goals_id,
      goal.id
    );
  });
  return selected_goals;
}

function add_calculatedGoalIndicator() {}
function add_scope() {}
