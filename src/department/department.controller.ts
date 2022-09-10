import { Router } from "express";
import { handleError } from "../utils/express.utils";
import { DepartmentService } from "./department.service";

export class DepartmentController {
  router = Router();

  // loadRoutes
  loadRoutes() {
    // get departments
    this.router.get("/", async (req, res) => {
      try {
        const department = await new DepartmentService().getDepartments();

        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    // get department
    this.router.get("/single/:id", async (req, res) => {
      try {
        const department = await new DepartmentService().getDepartment(
          req.params.id
        );
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    // create department
    this.router.post("/", async (req, res) => {
      try {
        const department = await new DepartmentService().createDepartment(
          req.body
        );
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    // update department
    this.router.put("/", async (req, res) => {
      try {
        const department = await new DepartmentService().updateDepartment(
          req.body
        );
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    // delete department
    this.router.put("/", async (req, res) => {
      try {
        const department = await new DepartmentService().deleteDepartment(
          req.body.id
        );
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    // update department hod
    this.router.put("/hod", async (req, res) => {
      try {
        const department = await new DepartmentService().updateDepartmentHOD(
          req.body
        );
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.post("/members", async (req, res) => {
      try {
        const department = await new DepartmentService().addMembers(req.body);
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    this.router.delete("/members", async (req, res) => {
      try {
        const department = await new DepartmentService().removeMember(req.body);
        res.send(department);
      } catch (error) {
        handleError(error, res);
      }
    });
    return this.router;
  }
}
