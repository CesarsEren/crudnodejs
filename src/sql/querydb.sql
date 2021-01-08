
create database crudnode

use crudnode
 
CREATE TABLE [dbo].[Tareas](
	[tarea_id] [int]  primary key identity,
	[tarea_nombre] [varchar](50) NULL,
	[tarea_estado] [smallint] NULL,
	[tarea_detalle] [varchar](100) NULL
)  
  

go
create procedure InsertTareas

@tarea_nombre varchar(150),
@tarea_detalle varchar(150),
@tarea_estado smallint
as
begin
insert into Tareas values(@tarea_nombre,@tarea_estado,@tarea_detalle);
end
 
  
go
create procedure UpdateTarea
@tarea_id int,
@tarea_nombre varchar(150),
@tarea_detalle varchar(150),
@tarea_estado smallint
as
begin
update Tareas set tarea_nombre = @tarea_nombre,tarea_estado =@tarea_estado, tarea_detalle=@tarea_detalle where tarea_id = @tarea_id;
end

