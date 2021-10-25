import { Request, Response } from "express";
import { database2 } from "../../data/database2";
import { DataColumnQ } from "../../models/architecture/DataColumnQ";
import { Goal } from "../../models/selfAwarness/Goal";
import { DataFlowQ } from "../../models/selfAwarness/qwertyModels/DataFlowQ";
import { MetricQ } from "../../models/selfAwarness/qwertyModels/MetricQ";
import {
  CollectionMethodQ,
  GoalQ,
  SelfAwarenessProcessQ,
  SelfAwarnessQ,
  AnalysisModelQ,
  CalculationMethodQ,
  DecisionCriteriaQ,
  SelfAwarenessAspectQ,
  ActionQ,
  ThresholdQ,
  SimulationScenarioQ,
  SimulationValueQ,
  SimulationVariableQ,
  ArgumentToParameterMappingQ,
  ImplementationResourceQ,
  ParameterQ,
  DirectMetricQ,
  IndicatorQ,
  IndirectMetricQ,
  ScaleQ,
  MeasurementUnitQ,
} from "../../models/selfAwarnessModels";

var modelID: any;
var routes: any = {
  aspect: { p: {}, r: {} },
  goal: {},
  collection: { p: {}, r: {} },
  analisisModel: { p: {}, r: {} },
  calculationMethod: { p: {}, r: {} },
  decisionCriteria: {},
  action: { p: {}, r: {} },
  simulationscenario: { p: {}, r: {} },
  simulationvariable: { p: {}, r: {} },
  argumentToParameterMapping: { p: {}, r: {} },
  parameter: { p: {}, r: {} },
  implementationResource: { p: {}, r: {}, i: [] },
  metric: { p: {}, r: {}, i: [] },
  scale: { p: {}, r: {}, i: [] },
  units: { p: {}, r: {}, i: [] },
  data_column: {},
};

var r1 = { session: { active_model: { modelID: 65 } } };
var r2 = {};
generate_model(r1, r2);
//export async function generate_model(req: Request, res: Response) {
export async function generate_model(req, res) {
  modelID = req.session?.active_model.modelID;
  var db = new database2();
  var modelo: SelfAwarnessQ = new SelfAwarnessQ(-1, "", "", "", "");
  var rows = await db.qwerty(
    modelo.toSqlSelect(["/@/MODEL/@/"], [modelID.toString()])
  );

  routes = {
    aspect: { p: {}, r: {} },
    goal: {},
    collection: { p: {}, r: {} },
    analisisModel: { p: {}, r: {} },
    calculationMethod: { p: {}, r: {} },
    decisionCriteria: {},
    action: { p: {}, r: {} },
    simulationscenario: { p: {}, r: {} },
    simulationvariable: { p: {}, r: {} },
    argumentToParameterMapping: { p: {}, r: {} },
    parameter: { p: {}, r: {} },
    implementationResource: { p: {}, r: {}, i: [] },
    metric: { p: {}, r: {}, i: [] },
    scale: { p: {}, r: {}, i: [] },
    units: { p: {}, r: {}, i: [] },
    data_column: {},
  };

  modelo = modelo.toObjectArray(rows)[0];
  var modeloA = JSON.parse(modelo.architectureModel);
  await add_span(modeloA[Object.keys(modeloA)[0]]);
  await add_SelfAwarenessAspect(modeloA[Object.keys(modeloA)[0]]);
  await add_scope(modeloA[Object.keys(modeloA)[0]]);
  await add_decision_criteria(modeloA[Object.keys(modeloA)[0]]);
  await add_ImplementationResource(modeloA[Object.keys(modeloA)[0]]);
  await add_metric(modeloA[Object.keys(modeloA)[0]]);
  await add_scale(modeloA[Object.keys(modeloA)[0]]);
  await add_MeasurementUnit(modeloA[Object.keys(modeloA)[0]]);
  await add_dataFlow_relation(modeloA[Object.keys(modeloA)[0]]);
  await add_relation_data_colum(modeloA[Object.keys(modeloA)[0]]);

  console.log("///////////////////////////////////////");
  console.log("     All Model");
  modeloA = {
    AutoconscienciaIoT: modeloA[Object.keys(modeloA)[0]],
  };
  console.log(modeloA);
  res.render("generate_model", {
    session: req.session,
    model: JSON.stringify(modeloA, null, "  "),
  });
}

async function add_relation_data_colum(model: any) {
  var paths = Object.keys(routes["data_column"]);
  for (var i = 0; i < paths.length; i++) {
    var to_add: string[] = routes["data_column"][paths[i]];
    var route_list: string[] = paths[i].substr(3).split("/@");
    await recursive_relation_data_colum(route_list.reverse(), to_add, model);
  }
}

async function recursive_relation_data_colum(
  route: string[],
  to_add: string[],
  model: any
) {
  var next_path = route.pop();
  if (next_path) {
    var aux = next_path.split(".");
    var key = aux[0];
    var position = aux[1];
    await recursive_relation_data_colum(route, to_add, model[key][position]);
  } else {
    for (var i = 0; i < to_add.length; i++) {
      if (!model.relatesMetaData) model.relatesMetaData = `${to_add[i]}`;
      else model.relatesMetaData += ` ${to_add[i]}`;
    }
    console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@");
    console.log("              DATA COLUMN  ");
    console.log(model);
  }
}

async function add_span(model: any) {
  if (model["containsIoTSystem"]) {
    var principa_system = model["containsIoTSystem"][0];
    var path = "//@containsIoTSystem.0";
    //await add_goal(principa_system, path);
    await add_SelfAwarenessProcess(principa_system, path);
    //await add_SelfAwarenessAspect(principa_system, path);
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
    //await add_goal(system[i], actual_path);
    await add_SelfAwarenessProcess(system[i], actual_path);
    //await add_SelfAwarenessAspect(system[i], actual_path);
    if (system[i].containsIoTSubSystem)
      await recursive_span(system[i].containsIoTSubSystem, actual_path);
  }
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
    await add_SelfAwarenessAspect_relation(new_process, path_process);
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
      var methodG = methods[i].toObjectG();
      routes["collection"]["p"][
        methods[i].id.toString()
      ] = `${path_process}/@usesCollectionMethod.${i}`;
      routes["collection"]["r"][methods[i].id.toString()] = methodG;
      await add_directMetric(
        methodG,
        `${path_process}/@usesCollectionMethod.${i}`
      );
      process.usesCollectionMethod.push(methodG);
    }
  }
  await add_analisisModel(process, path_process);
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
      var new_path = `${path_process}/@usesAnalysisModel.${i}`;
      routes["analisisModel"]["p"][`${model[i].id}`] = new_path;
      var modelG = model[i].toObjectG();
      await add_action(modelG, new_path);
      await add_argumentToParameterMapping(modelG, new_path);
      await add_Indicator(modelG, new_path);
      process.usesAnalysisModel.push(modelG);
    }
  }
}

async function add_directMetric(method, path_method) {
  var db = new database2();
  var metric: DirectMetricQ = new DirectMetricQ(-1, "", "", "");
  var sql = metric.toSqlSelect(["/@/METHOD/@/"], [method.$.id]);
  var rows = await db.qwerty(sql);
  var metric_list: DirectMetricQ[] = metric.toObjectArray(rows);
  for (var i = 0; i < metric_list.length; i++) {
    var the_metric = routes["metric"]["r"][metric_list[i].id.toString()];
    if (the_metric) {
      the_metric.isProducedBy += ` ${path_method}`;
    } else {
      routes["metric"]["r"][metric_list[i].id.toString()] = metric_list[
        i
      ].toObjectG();
      the_metric = routes["metric"]["r"][metric_list[i].id.toString()];
      the_metric.isProducedBy = `${path_method}`;
      routes["metric"]["i"].push(the_metric.$.id.toString());
    }
    var indx = routes["metric"]["i"].indexOf(the_metric.$.id.toString());
    var path_metric = `//@containsMetric.${indx}`;
    routes["metric"]["p"][metric_list[i].id.toString()] = path_metric;
    method.produces = path_metric;
  }
}

async function add_metric(model) {
  var indx_l: any[] = routes["metric"]["i"];
  if (indx_l.length > 0) model.containsMetric = [];
  for (var i = 0; i < indx_l.length; i++) {
    var met = routes["metric"]["r"][indx_l[i]];
    await add_Scale_metric(model, met, routes["metric"]["p"][indx_l[i]]);
    await add_MeasurementUnit_metric(
      model,
      met,
      routes["metric"]["p"][indx_l[i]]
    );
    await add_relation_metric_mapping(met, routes["metric"]["p"][indx_l[i]]);
    await add_metric_relation_selfAwarenessAspect(
      met,
      routes["metric"]["p"][indx_l[i]]
    );
    model.containsMetric.push(met);
  }
}

async function add_Scale_metric(model, metric, path_metric) {
  var db = new database2();
  var scale: ScaleQ = new ScaleQ(-1, "", "", "");
  var sql = scale.toSqlSelect(["/@/METRIC/@/"], [metric.$.id]);
  var rows = await db.qwerty(sql);
  var scale_list: ScaleQ[] = scale.toObjectArray(rows);
  for (var i = 0; i < scale_list.length; i++) {
    var the_scale = routes["scale"]["r"][scale_list[i].id.toString()];
    if (the_scale) {
      the_scale.isUsedBy += ` ${path_metric}`;
    } else {
      routes["scale"]["r"][scale_list[i].id.toString()] = scale_list[
        i
      ].toObjectG();
      the_scale = routes["scale"]["r"][scale_list[i].id.toString()];
      the_scale.isUsedBy = `${path_metric}`;
      routes["scale"]["i"].push(the_scale.$.id.toString());
    }
    var indx = routes["scale"]["i"].indexOf(the_scale.$.id.toString());
    var path_scale = `//@containsScale.${indx}`;
    routes["scale"]["p"][scale_list[i].id.toString()] = path_scale;
    metric.isValidatedBy = path_scale;
  }
}

async function add_MeasurementUnit_metric(model, metric, path_metric) {
  var db = new database2();
  var uni: MeasurementUnitQ = new MeasurementUnitQ(-1, "", "", "");
  var sql = uni.toSqlSelect(["/@/METRIC/@/"], [metric.$.id]);
  var rows = await db.qwerty(sql);
  var units_list: MeasurementUnitQ[] = uni.toObjectArray(rows);
  for (var i = 0; i < units_list.length; i++) {
    var the_units = routes["units"]["r"][units_list[i].id.toString()];
    if (the_units) {
      the_units.isUsedBy += ` ${path_metric}`;
    } else {
      routes["units"]["r"][units_list[i].id.toString()] = units_list[
        i
      ].toObjectG();
      the_units = routes["units"]["r"][units_list[i].id.toString()];
      the_units.isUsedBy = `${path_metric}`;
      routes["units"]["i"].push(the_units.$.id.toString());
    }
    var indx = routes["units"]["i"].indexOf(the_units.$.id.toString());
    var path_units = `//@containsMeasurementUnit.${indx}`;
    routes["units"]["p"][units_list[i].id.toString()] = path_units;
    metric.isExpressedIn = path_units;
  }
}

async function add_action(analisisModel, path_model) {
  var db = new database2();
  var action: ActionQ = new ActionQ(-1, "");
  var sql = action.toSqlSelect(["/@/MODEL/@/"], [analisisModel.$.id]);
  var rows = await db.qwerty(sql);
  var action_list: ActionQ[] = action.toObjectArray(rows);
  if (action_list.length > 0) {
    if (!analisisModel.containsAction) analisisModel.containsAction = [];
    for (var i = 0; i < action_list.length; i++) {
      var ac = action_list[i].toObjectG();
      routes["action"]["p"][
        `${action_list[i].id}`
      ] = `${path_model}/@containsAction.${i}`;
      routes["action"]["r"][`${action_list[i].id}`] = ac;
      analisisModel.containsAction.push(ac);
    }
  }
}

async function add_Indicator(method, path_method) {
  var db = new database2();
  var metric: IndicatorQ = new IndicatorQ(-1, "", "", "", "");
  var sql = metric.toSqlSelect(["/@/METHOD/@/"], [method.$.id]);
  var rows = await db.qwerty(sql);
  var metric_list: IndicatorQ[] = metric.toObjectArray(rows);
  for (var i = 0; i < metric_list.length; i++) {
    var the_metric = routes["metric"]["r"][metric_list[i].id.toString()];
    if (the_metric) {
      the_metric.isProducedBy += ` ${path_method}`;
    } else {
      routes["metric"]["r"][metric_list[i].id.toString()] = metric_list[
        i
      ].toObjectG();
      the_metric = routes["metric"]["r"][metric_list[i].id.toString()];
      the_metric.isProducedBy = `${path_method}`;
      routes["metric"]["i"].push(the_metric.$.id.toString());
    }
    var indx = routes["metric"]["i"].indexOf(the_metric.$.id.toString());
    var path_metric = `//@containsMetric.${indx}`;
    routes["metric"]["p"][metric_list[i].id.toString()] = path_metric;
    method.produces = path_metric;
  }
}

async function add_argumentToParameterMapping(container, path_container) {
  var db = new database2();
  var mapping: ArgumentToParameterMappingQ = new ArgumentToParameterMappingQ(
    -1
  );
  var sql = mapping.toSqlSelect(["/@/METHOD/@/"], [container.$.id]);
  var rows = await db.qwerty(sql);
  var parameter_mapping_list: ArgumentToParameterMappingQ[] = mapping.toObjectArray(
    rows
  );
  if (parameter_mapping_list.length > 0) {
    if (!container.containsArgumentToParameterMapping)
      container.containsArgumentToParameterMapping = [];
    for (var i = 0; i < parameter_mapping_list.length; i++) {
      var mp: any = parameter_mapping_list[i].toObjectG();
      var path_maping = `${path_container}/@containsArgumentToParameterMapping.${i}`;
      if (parameter_mapping_list[i].is_metadata) {
        await relation_metadata_mapping_to_dataColumn(
          mp,
          parameter_mapping_list[i].metadata,
          path_maping
        );
      }
      if (parameter_mapping_list[i].is_using_simulation_variable) {
        mp.relatesSimulationVariable =
          routes["simulationvariable"]["p"][
            `${parameter_mapping_list[i].simulation_variable}`
          ];
        var simulation_variable =
          routes["simulationvariable"]["r"][
            `${parameter_mapping_list[i].simulation_variable}`
          ];
        if (simulation_variable.isUsedIn) {
          simulation_variable.isUsedIn += ` ${path_maping}`;
        } else simulation_variable.isUsedIn = path_maping;
      }
      routes["argumentToParameterMapping"]["p"][
        `${parameter_mapping_list[i].id}`
      ] = path_maping;
      routes["argumentToParameterMapping"]["r"][
        `${parameter_mapping_list[i].id}`
      ] = mp;
      var path_parameter = await save_and_generate_parameter_route(
        mp,
        path_maping,
        container
      );
      mp.relatesParameter = path_parameter;
      container.isImplementedBy = path_parameter.split("/@containsP")[0];
      container.containsArgumentToParameterMapping.push(mp);
    }
  }
}

async function relation_metadata_mapping_to_dataColumn(
  parameter_mapping,
  data_colum_id,
  path_mapping
) {
  console.log("############################################");
  console.log("           MAPEO DE PARAMETROS   ");
  var sql = `SELECT
  	data_column_path as path
  	FROM 
	data_column
	WHERE
	data_id=${data_colum_id} AND ma_id=${modelID}`;
  var db = new database2();
  var rows = await db.qwerty(sql);
  for (var i = 0; i < rows.length; i++) {
    var path_colum = rows[i].path;
    parameter_mapping.isUsedIn = path_colum;
    if (routes["data_column"][path_colum])
      routes["data_column"][path_colum].push(path_mapping);
    else {
      routes["data_column"][path_colum] = [];
      routes["data_column"][path_colum].push(path_mapping);
    }
    console.log(parameter_mapping);
  }
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
      var methodG = methods[i].toObjectG();
      var path_method = `${path_process}/@usesCalculationMethod.${i}`;
      routes["calculationMethod"]["p"][`${methods[i].id}`] = path_method;
      await add_SimulationScenario(methodG, path_method);
      await add_SimulationVarible(methodG, path_method);
      await add_argumentToParameterMapping(methodG, path_method);
      await add_IndirectMetric(methodG, path_method);
      process.usesCalculationMethod.push(methodG);
    }
  }
}

async function add_SimulationScenario(calculationMethod, path_calculation) {
  var db = new database2();
  var simulation: SimulationScenarioQ = new SimulationScenarioQ(-1, "", "");
  var sql = simulation.toSqlSelect(["/@/METHOD/@/"], [calculationMethod.$.id]);
  var rows = await db.qwerty(sql);
  var simula_list: SimulationScenarioQ[] = simulation.toObjectArray(rows);
  if (!calculationMethod.containsSimulationScenario)
    calculationMethod.containsSimulationScenario = [];
  for (var i = 0; i < simula_list.length; i++) {
    var sm = simula_list[i].toObjectG();
    routes["simulationscenario"]["p"][
      `${simula_list[i].id}`
    ] = `${path_calculation}/@containsSimulationScenario.${i}`;
    routes["simulationscenario"]["r"][`${simula_list[i].id}`] = sm;
    calculationMethod.containsSimulationScenario.push(sm);
  }
}

async function add_SimulationVarible(calculationMethod, path_calculation) {
  var db = new database2();
  var simulationVar: SimulationVariableQ = new SimulationVariableQ(-1, "");
  var sql = simulationVar.toSqlSelect(
    ["/@/METHOD/@/"],
    [calculationMethod.$.id]
  );
  var rows = await db.qwerty(sql);
  var simula_list: SimulationVariableQ[] = simulationVar.toObjectArray(rows);
  if (!calculationMethod.containsSimulationVariable)
    calculationMethod.containsSimulationVariable = [];
  for (var i = 0; i < simula_list.length; i++) {
    var sm = simula_list[i].toObjectG();
    routes["simulationvariable"]["p"][
      `${simula_list[i].id}`
    ] = `${path_calculation}/@containsSimulationVariable.${i}`;
    routes["simulationvariable"]["r"][`${simula_list[i].id}`] = sm;
    await add_SimulationValue(
      sm,
      `${path_calculation}/@containsSimulationVariable.${i}`
    );
    calculationMethod.containsSimulationVariable.push(sm);
  }
}

async function add_SimulationValue(simulationVariable, path_variable) {
  var db = new database2();
  var simulationValue: SimulationValueQ = new SimulationValueQ(-1);
  var sql = simulationValue.toSqlSelect(
    ["/@/VARIABLE/@/"],
    [simulationVariable.$.id]
  );
  var rows = await db.qwerty(sql);
  var simula_list: SimulationValueQ[] = simulationValue.toObjectArray(rows);
  if (!simulationVariable.containsSimulationValue)
    simulationVariable.containsSimulationValue = [];
  for (var i = 0; i < simula_list.length; i++) {
    var sm: any = simula_list[i].toObjectG();
    sm.isUsed =
      routes["simulationscenario"]["p"][simula_list[i].scenario_id!.toString()];
    var obj: any =
      routes["simulationscenario"]["r"][simula_list[i].scenario_id!.toString()];
    if (obj.uses) obj.uses += ` ${path_variable}/@containsSimulationValue.${i}`;
    else obj.uses = `${path_variable}/@containsSimulationValue.${i}`;
    simulationVariable.containsSimulationValue.push(sm);
  }
}

async function add_IndirectMetric(method, path_method) {
  var db = new database2();
  var metric: IndirectMetricQ = new IndirectMetricQ(-1, "", "", "");
  var sql = metric.toSqlSelect(["/@/METHOD/@/"], [method.$.id]);
  var rows = await db.qwerty(sql);
  var metric_list: IndirectMetricQ[] = metric.toObjectArray(rows);
  for (var i = 0; i < metric_list.length; i++) {
    var the_metric = routes["metric"]["r"][metric_list[i].id.toString()];
    if (the_metric) {
      the_metric.isProducedBy += ` ${path_method}`;
    } else {
      routes["metric"]["r"][metric_list[i].id.toString()] = metric_list[
        i
      ].toObjectG();
      the_metric = routes["metric"]["r"][metric_list[i].id.toString()];
      the_metric.isProducedBy = `${path_method}`;
      routes["metric"]["i"].push(the_metric.$.id.toString());
    }
    var indx = routes["metric"]["i"].indexOf(the_metric.$.id.toString());
    var path_metric = `//@containsMetric.${indx}`;
    routes["metric"]["p"][metric_list[i].id.toString()] = path_metric;
    method.produces = path_metric;
  }
}

async function add_SelfAwarenessAspect_relation(
  process: any,
  path_process: string
) {
  var db = new database2();
  var SelfAwarness: SelfAwarenessAspectQ;
  SelfAwarness = new SelfAwarenessAspectQ(-1, "", "", 0, undefined);
  var sql = SelfAwarness.toSqlSelect(
    ["/@/MODEL/@/", "/@/PROCESS/@/"],
    [modelID, process.$.id]
  );
  var rows = await db.qwerty(sql);
  var aspects:
    | SelfAwarenessAspectQ[]
    | SelfAwarenessAspectQ = SelfAwarness.toObjectArray(rows);
  if (aspects.length > 0) {
    aspects = aspects[0];
    var the_aspect = aspects.toObjectG();
    the_aspect.isCaptured = path_process;
    routes["aspect"]["r"][`${the_aspect.$.id}`] = the_aspect;
    var indx = Object.keys(routes["aspect"]["r"]).length - 1;
    var path_aspect = `//@containsSelfAwarenessAspect.${indx}`;
    routes["aspect"]["p"][`${the_aspect.$.id}`] = path_aspect;
    process.captures = path_aspect;
    if (aspects.is_colective()) {
      await add_recursive_collective_aspects(aspects, the_aspect, path_aspect);
    }
  }

  /*
  var arr_insert_aspects: any[] = [];
  for (var i = 0; i < aspects.length; i++) {
    var new_aspect = aspects[i].toObjectG();
    arr_insert_aspects.push(new_aspect);
    //await add_relation_Aspect_Process_SelfAweranes(
    //  new_aspect,
    //  arr_insert_aspects.length - 1,
    //  span.constainsSelfAwarenessProcess,
    //  span_path
    //);
    //await add_relation_SelfAweranesAspect_Goals(
    //  new_aspect,
    //  span.containsGoal,
    //  span_path,
    //  `${span_path}/@containsSelfAwarenessAspect.${
    //    arr_insert_aspects.length - 1
    //  }`
    //);
  }
  if (arr_insert_aspects.length > 0)
    span.containsSelfAwarenessAspect = arr_insert_aspects;
*/
}

async function add_recursive_collective_aspects(
  aspect: SelfAwarenessAspectQ,
  aspectG,
  path_aspect
) {
  var db = new database2();
  var sql = aspect.sql_childs();
  var rows = await db.qwerty(sql);
  var child_aspects: SelfAwarenessAspectQ[] = aspect.toObjectArray(rows);
  for (var i = 0; i < child_aspects.length; i++) {
    if (routes["aspect"]["r"][`${child_aspects[i].id}`]) {
      var the_aspect = routes["aspect"]["r"][`${child_aspects[i].id}`];
      the_aspect.isDerivedFrom = path_aspect;
      if (aspectG.derives)
        aspectG.derives += " " + routes["aspect"]["p"][`${the_aspect.$.id}`];
      else aspectG.derives = routes["aspect"]["p"][`${the_aspect.$.id}`];
    } else {
      var the_aspect = child_aspects[i].toObjectG();
      the_aspect.isDerivedFrom = path_aspect;
      routes["aspect"]["r"][`${the_aspect.$.id}`] = the_aspect;
      var indx = Object.keys(routes["aspect"]["r"]).length - 1;
      var new_path_aspect = `//@containsSelfAwarenessAspect.${indx}`;
      if (aspectG.derives) aspectG.derives += " " + new_path_aspect;
      else aspectG.derives = new_path_aspect;
      routes["aspect"]["p"][`${the_aspect.$.id}`] = new_path_aspect;
      if (child_aspects[i].is_colective()) {
        add_recursive_collective_aspects(
          child_aspects[i],
          the_aspect,
          new_path_aspect
        );
      }
    }
  }
}

async function add_SelfAwarenessAspect(model) {
  var aspects = routes["aspect"]["r"];
  model.containsSelfAwarenessAspect = [];
  for (let aspect of Object.entries(aspects)) {
    model.containsSelfAwarenessAspect.push(aspect[1]);
  }
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
    if (scope_list[i].hasProperty) {
      var propertys = scope_list[i].hasProperty;
      for (var j = 0; j < propertys.length; j++) {
        await add_relation_method_property(
          propertys[j],
          `${actual_path}/@hasProperty.${j}`
        );
      }
    }
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
    `select asp.aa_id 
	  from 
	  aspectoautoconsciencia_objeto asp INNER JOIN
	  procesoautoconsciencia pr ON asp.aa_id=pr.aa_id
	  where asp.obj_id=${scope.$.id} and asp.ma_id=${modelID}`
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
  var route = routes["aspect"]["p"][`${aspect_id}`];
  route = route.substring(3, route.length);
  route = route.split("/@").reverse();
  var aspect_obj = recursive_element(route, model);
  aspect_obj.belongsTo = scope_path;
  if (scope.has) scope.has += " " + routes["aspect"]["p"][`${aspect_id}`];
  else scope.has = routes["aspect"]["p"][`${aspect_id}`];
}

async function add_decision_criteria(model: any) {
  //await add_decision_criteria_relationed_goal(model);
  await add_decision_criteria_relationed_analysisModel(model);
  for (var i = 0; i < model.containsDecisionCriteria.length; i++) {
    await add_threshold(model.containsDecisionCriteria[i]);
  }
}

async function add_decision_criteria_relationed_analysisModel(model: any) {
  if (!model.containsDecisionCriteria) model.containsDecisionCriteria = [];
  var db = new database2();
  var list_id_models = Object.keys(routes["analisisModel"]["p"]);
  var decisionCriteria: DecisionCriteriaQ = new DecisionCriteriaQ(-1, "", "");
  for (var i = 0; i < list_id_models.length; i++) {
    var sql = decisionCriteria.toSqlSelect(
      ["/@/METHOD/@/"],
      [list_id_models[i]]
    );
    var rows = await db.qwerty(sql);
    var criteria: DecisionCriteriaQ[] = decisionCriteria.toObjectArray(rows);
    if (criteria.length > 0) {
      if (routes["decisionCriteria"][criteria[0].id.toString()]) {
        var indx_criteria = parseInt(
          routes["decisionCriteria"][criteria[0].id.toString()].split(".")[1]
        );
        if (model.containsDecisionCriteria[indx_criteria].isUsedBy) {
          model.containsDecisionCriteria[indx_criteria].isUsedBy +=
            " " + routes["analisisModel"]["p"][list_id_models[i]];
        } else {
          model.containsDecisionCriteria[indx_criteria].isUsedBy =
            " " + routes["analisisModel"]["p"][list_id_models[i]];
        }
      } else {
        model.containsDecisionCriteria.push(criteria[0].toObjectG());
        var indx_criteria = model.containsDecisionCriteria.length - 1;
        routes["decisionCriteria"][
          criteria[0].id.toString()
        ] = `//@containsDecisionCriteria.${indx_criteria}`;
        model.containsDecisionCriteria[indx_criteria].isUsedBy =
          routes["analisisModel"]["p"][list_id_models[i]];
      }
      var path_model_list = routes["analisisModel"]["p"][list_id_models[i]]
        .replace("//@", "")
        .split("/@")
        .reverse();
      add_relation_model_analysis_decisionCriteria(
        model,
        path_model_list,
        routes["decisionCriteria"][criteria[0].id.toString()]
      );
    }
  }
}

async function add_threshold(decisionCriteria) {
  var db = new database2();
  var thres: ThresholdQ = new ThresholdQ(-1, "", "", -1, -1);
  var sql = thres.toSqlSelect(["/@/CRITERIA/@/"], [decisionCriteria.$.id]);
  var rows = await db.qwerty(sql);
  var thres_list: ThresholdQ[] = thres.toObjectArray(rows); // arreglar to object
  if (!decisionCriteria.containsThreshold)
    decisionCriteria.containsThreshold = [];
  for (var i = 0; i < thres_list.length; i++) {
    var th = thres_list[i].toObjectG();
    await add_relation_threshold_action(
      th,
      `${
        routes["decisionCriteria"][decisionCriteria.$.id]
      }/@containsThreshold.${i}`
    );
    decisionCriteria.containsThreshold.push(th);
  }
}

async function add_relation_threshold_action(threshold, path_threshold) {
  var db = new database2();
  var thres: ThresholdQ = new ThresholdQ(
    threshold.$.id,
    threshold.$.name,
    threshold.$.interpretation,
    threshold.$.lowerThreshold,
    threshold.$.upperThreshold
  );
  var sql = thres.toSqlSelect(["/@/RELATION_ACTION/@/"], []);
  var rows = await db.qwerty(sql);
  for (var i = 0; i < rows.length; i++) {
    var path_action = routes["action"]["p"][rows[i].id.toString()];
    threshold.recommends = path_action;
    var obj: any = routes["action"]["r"][rows[i].id.toString()];
    obj.isRecommendedIn = path_threshold;
  }
}

async function add_metric_relation_selfAwarenessAspect(metric, path_metric) {
  var db = new database2();
  var sql = `SELECT
		asp.aa_id as id
		FROM
		aspectoautoconsciencia_metrica asp INNER JOIN
		procesoautoconsciencia pr ON asp.aa_id=pr.aa_id
		WHERE
		asp.met_id=${metric.$.id}`;
  var rows = await db.qwerty(sql);
  for (var i = 0; i < rows.length; i++) {
    if (metric.evaluates) {
      metric.evaluates += " " + routes["aspect"]["p"][rows[i].id.toString()];
    } else {
      metric.evaluates = routes["aspect"]["p"][rows[i].id.toString()];
    }
    if (routes["aspect"]["r"][rows[i].id.toString()].isEvaluatedBy) {
      routes["aspect"]["r"][rows[i].id.toString()].isEvaluatedBy +=
        " " + path_metric;
    } else {
      routes["aspect"]["r"][rows[i].id.toString()].isEvaluatedBy = path_metric;
    }
  }
}

async function add_ImplementationResource(model) {
  var indx_l: any[] = routes["implementationResource"]["i"];
  if (indx_l.length > 0) model.containsImplementationResource = [];
  for (var i = 0; i < indx_l.length; i++) {
    var ip = routes["implementationResource"]["r"][indx_l[i]];
    model.containsImplementationResource.push(ip);
  }
}
//para buscar
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//Aqui abajo lo viejo, que hay que revisar

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

async function add_relation_method_property(property, path_property) {
  var db = new database2();
  var sql = `SELECT
		mea.mea_id as id
		FROM
		propiedad pro,
		metodorecoleccion mea
		WHERE
		pro.pro_id=${property.$.id} AND
		mea.pro_id=pro.pro_id`;
  var rows = await db.qwerty(sql);
  for (var i = 0; i < rows.length; i++) {
    if (property.isCollectedBy) {
      property.isCollectedBy +=
        " " + routes["collection"]["p"][rows[i].id.toString()];
    } else {
      property.isCollectedBy = routes["collection"]["p"][rows[i].id.toString()];
    }
    if (routes["collection"]["r"][rows[i].id.toString()].collectsProperty) {
      console.log(`la propiedad buscada es: ${rows[i].id}`);
      console.log(routes["property"]);
      routes["property"]["r"][rows[i].id.toString()].collectsProperty +=
        " " + path_property;
    } else {
      routes["collection"]["r"][
        rows[i].id.toString()
      ].collectsProperty = path_property;
    }
  }
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
          path + `/@containsSelfAwarenessAspect.${aspect_inx}`;
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
  routes["aspect"]["p"][`${aspect.$.id}`] = path_aspect;
  routes["aspect"]["r"][`${aspect.$.id}`] = aspect;
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

function add_relation_model_analysis_decisionCriteria(
  model: any,
  path_model: string[],
  path_criteria: string
) {
  var next_path = path_model.pop();
  if (next_path) {
    var next_path_l: any[] = next_path.split(".");
    add_relation_model_analysis_decisionCriteria(
      model[next_path_l[0]][parseInt(next_path_l[1])],
      path_model,
      path_criteria
    );
  } else {
    model.uses = path_criteria;
  }
}

async function save_and_generate_parameter_route(
  mapping,
  path_maping,
  method
): Promise<string> {
  var db = new database2();
  var parameter: ParameterQ = new ParameterQ(-1, "", "", false);
  var sql = parameter.toSqlSelect(["/@/MAPPING/@/"], [mapping.$.id]);
  var rows = await db.qwerty(sql);
  var parameter_element: ParameterQ = parameter.toObjectArray(rows)[0];
  var the_paremeter = routes["parameter"]["r"][parameter_element.id.toString()];
  if (the_paremeter) {
    the_paremeter.isUsedIn += ` ${path_maping}`;
  } else {
    routes["parameter"]["r"][
      parameter_element.id.toString()
    ] = parameter_element.toObjectG();
    the_paremeter = routes["parameter"]["r"][parameter_element.id.toString()];
    the_paremeter.isUsedIn = `${path_maping}`;
  }
  //no se ha revisado esta funcion
  return await save_and_generate_resource_route(the_paremeter, method);
}

async function save_and_generate_resource_route(
  parameter,
  method
): Promise<string> {
  var db = new database2();
  var resource: ImplementationResourceQ;
  resource = new ImplementationResourceQ(-1, "", "", "");
  var sql = resource.toSqlSelect(["/@/PARAMETER/@/"], [parameter.$.ordinal]);
  var rows = await db.qwerty(sql);
  var resource_element: ImplementationResourceQ;
  resource_element = resource.toObjectArray(rows)[0];
  var the_resource =
    routes["implementationResource"]["r"][resource_element.id.toString()];
  var indx_parameter = -1;
  if (the_resource) {
    if (the_resource.containsParameter.indexOf(parameter) == -1)
      the_resource.containsParameter.push(parameter);
  } else {
    routes["implementationResource"]["r"][
      resource_element.id.toString()
    ] = resource_element.toObjectG();
    the_resource =
      routes["implementationResource"]["r"][resource_element.id.toString()];
    routes["implementationResource"]["i"].push(resource_element.id.toString());
    the_resource.containsParameter = [];
    the_resource.containsParameter.push(parameter);
    indx_parameter = the_resource.containsParameter.length - 1;
  }
  var indx = routes["implementationResource"]["i"].indexOf(
    resource_element.id.toString()
  );
  var path_resource = `//@containsImplementationResource.${indx}`;
  if (method.$.calculationPeriodStart) {
    if (the_resource.implementsCalculationMethod) {
      the_resource.implementsCalculationMethod += ` ${
        routes["calculationMethod"]["p"][method.$.id]
      }`;
    } else {
      the_resource.implementsCalculationMethod =
        routes["calculationMethod"]["p"][method.$.id];
    }
  } else {
    if (the_resource.implementsAnalysisModel) {
      the_resource.implementsAnalysisModel += ` ${
        routes["analisisModel"]["p"][method.$.id]
      }`;
    } else {
      the_resource.implementsAnalysisModel =
        routes["analisisModel"]["p"][method.$.id];
    }
  }

  return `${path_resource}/@containsParameter.${indx_parameter}`;
}

async function add_scale(model) {
  var indx_l: any[] = routes["scale"]["i"];
  if (indx_l.length > 0) model.containsScale = [];
  for (var i = 0; i < indx_l.length; i++) {
    var scal = routes["scale"]["r"][indx_l[i]];
    model.containsScale.push(scal);
  }
}

async function add_MeasurementUnit(model) {
  var indx_l: any[] = routes["units"]["i"];
  if (indx_l.length > 0) model.containsMeasurementUnit = [];
  for (var i = 0; i < indx_l.length; i++) {
    var units = routes["units"]["r"][indx_l[i] - 1000];
    model.containsMeasurementUnit.push(units);
  }
}

async function add_relation_metric_mapping(metric, path_metric) {
  var db = new database2();
  var met: MetricQ = new MetricQ(-1, "", "", "", "");
  var sql = met.toSqlSelect(["/@/METRIC/@/"], [metric.$.id]);
  var rows = await db.qwerty(sql);
  for (var i = 0; i < rows.length; i++) {
    if (routes["argumentToParameterMapping"]["r"][rows[i].id]) {
      if (metric.isUsedIn)
        metric.isUsedIn +=
          " " + routes["argumentToParameterMapping"]["p"][rows[i].id];
      else
        metric.isUsedIn = routes["argumentToParameterMapping"]["p"][rows[i].id];
      routes["argumentToParameterMapping"]["r"][
        rows[i].id
      ].relatesMetric = path_metric;
    } else
      console.log(
        `El mapeo con id ${rows[i].id}, no esta guardado, y por lo tanto no se puede establecer la relacion con la metrica de id ${metric.$.id}`
      );
  }
}

async function add_dataFlow_relation(model) {
  var db = new database2();
  for (var i = 0; i < model.containsDataFlow.length; i++) {
    var sql = `Select 
    		met.mea_id as id
	       FROM
	       metodorecoleccion met,
	       flujodatos flu
	       WHERE
	       flu.flu_id = ${model.containsDataFlow[i].$.id} AND
		met.flu_id=flu.flu_id AND
		met.ma_id = flu.ma_id AND
	  	met.ma_id = ${modelID}`;
    var rows = await db.qwerty(sql);
    for (var j = 0; j < rows.length; j++) {
      if (model.containsDataFlow[i].support) {
        model.containsDataFlow[i].support +=
          " " + routes["collection"]["p"][rows[j].id.toString()];
      } else {
        model.containsDataFlow[i].support =
          routes["collection"]["p"][rows[j].id.toString()];
      }
      if (routes["collection"]["r"][rows[j].id.toString()].isSupportedBy) {
        routes["collection"]["r"][
          rows[j].id.toString()
        ].isSupportedBy += ` //@containsDataFlow.${i}`;
      } else {
        routes["collection"]["r"][
          rows[j].id.toString()
        ].isSupportedBy = `//@containsDataFlow.${i}`;
      }
    }
  }
}
