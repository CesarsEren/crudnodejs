const config = require("../database");
//const Tarea = require("../models/tarea");
const sql = require("mssql");

async function getTareas() {
  try {
    let pool = await sql.connect(config);
    let products = await pool.request().query("SELECT * from tareas");
    return products.recordsets;
  } catch (error) {
    console.log(error);
  }
}

async function addTarea(tarea) {
  try {
    let pool = await sql.connect(config);
    let InsertTareas = await pool
      .request()
      //.input("tarea_id", sql.Int, tarea.tarea_id)
      .input("tarea_nombre", sql.VarChar, tarea.tarea_nombre)
      .input("tarea_detalle", sql.VarChar, tarea.tarea_detalle)
      .input("tarea_estado", sql.Int, tarea.tarea_estado == "on" ? 1 : 0)
      .query(
        `insert into Tareas values(@tarea_nombre,@tarea_estado,@tarea_detalle)`
      );
    return InsertTareas.recordsets;

    /*
        let InsertTareas = await pool
      .request()
      //.input("tarea_id", sql.Int, tarea.tarea_id)
      .input("tarea_nombre", sql.VarChar, tarea.tarea_nombre)
      .input("tarea_detalle", sql.VarChar, tarea.tarea_detalle)
      .input("tarea_estado", sql.Int, 1)
      .execute("InsertTareas");
    return InsertTareas.recordsets;
     */
  } catch (err) {
    console.log(err);
  }
}

async function desactivarTarea(tarea_estado, id) {
  try {
    let pool = await sql.connect(config);
    let UpdatTareas = await pool
      .request()
      .input("tarea_id", sql.Int, parseInt(id))
      .input("tarea_estado", sql.Int, parseInt(tarea_estado))
      .query(
        "update tareas set tarea_estado = @tarea_estado where tarea_id = @tarea_id"
      );
    return UpdatTareas.recordsets;
  } catch (err) {
    console.log(err);
  }
}
async function updateTarea(tarea, id) {
  try {
    let pool = await sql.connect(config);
    /*let UpdatTareas = await pool
      .request()
      .input("tarea_id", sql.Int, id)
      .input("tarea_nombre", sql.VarChar, tarea.tarea_nombre)
      .input("tarea_detalle", sql.VarChar, tarea.tarea_detalle)
      .input("tarea_estado", sql.Int, 1)
      .query(
        `update Tareas set tarea_nombre = @tarea_nombre, tarea_estado = @tarea_estado, tarea_detalle = @tarea_detalle WHERE tarea_id = @tarea_id`
      );
    return UpdatTareas.recordsets;*/
    let UpdatTareas = await pool
      .request()
      .input("tarea_id", sql.Int, id)
      .input("tarea_nombre", sql.VarChar, tarea.tarea_nombre)
      .input("tarea_detalle", sql.VarChar, tarea.tarea_detalle)
      .input("tarea_estado", sql.Int, 1)
      .execute("UpdateTarea");
    return UpdatTareas.recordsets;
  } catch (err) {
    console.log(err);
  }
}

async function getTarea(tarea_id) {
  try {
    let pool = await sql.connect(config);
    let tareas = await pool
      .request()
      .input("tarea_id", sql.Int, tarea_id)
      .query("SELECT * from tareas where tarea_id = @tarea_id");
    return tareas.recordsets;

    /*let tareas = await pool
      .request()
      .query(`SELECT * from tareas where tarea_id = ${tarea_id}`);
    return tareas.recordsets;*/
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getTareas: getTareas,
  getTarea: getTarea,
  addTarea: addTarea,
  updateTarea: updateTarea,
  desactivarTarea: desactivarTarea,
};
