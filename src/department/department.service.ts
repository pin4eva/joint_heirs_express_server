import { ObjectId, Types } from "mongoose";
import { UserService } from "../user/user.service";
import {
  AddMembersInput,
  CreateDepartmentInput,
  RemoveMemberInput,
  UpdateDepartmentHODInput,
  UpdateDepartmentInput,
} from "./department.dto";
import { Department } from "./department.schema";

export class DepartmentService {
  // create department
  async createDepartment(input: CreateDepartmentInput) {
    try {
      const department = new Department(input);
      if (input.hod) {
        const hod = await new UserService().getUserById(input.hod);
        department.hod = hod.id;
      }
      await department.save();
      return department;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  // update department
  async updateDepartment(input: UpdateDepartmentInput) {
    try {
      const department = await this.findDepartmentByID(input.id);
      Object.assign(department, input);
      await department.save();
      return department;
    } catch (error) {
      throw Error(String(error));
    }
  }
  // update HOD
  async updateDepartmentHOD(input: UpdateDepartmentHODInput) {
    try {
      const department = await this.findDepartmentByID(input.id);
      const hod = await new UserService().getUserById(input.hod);
      department.hod = hod.id;

      await department.save();
      return department;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // add members
  async addMembers(input: AddMembersInput) {
    try {
      const department = await Department.findByIdAndUpdate(
        input.id,
        {
          $addToSet: { members: input.members },
        },
        { new: true }
      );

      return department;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // delete member
  async removeMember(input: RemoveMemberInput) {
    try {
      const department = await Department.findByIdAndUpdate(
        input.id,
        {
          $pull: { members: input.member },
        },
        { new: true }
      );

      return department;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  // delete department
  async deleteDepartment(id: string) {
    try {
      const department = await this.findDepartmentByID(id);
      department.remove();
      return department;
    } catch (error) {
      throw new Error(String(error));
    }
  }

  // get departments
  async getDepartments() {
    try {
      const departments = await Department.find();

      return departments;
    } catch (error) {
      throw new Error(String(error));
    }
  }
  // get department
  async getDepartment(id: string) {
    return await this.findDepartmentByID(id);
  }

  // find department
  private async findDepartmentByID(id: string) {
    try {
      const department = await Department.findById(id).populate("members hod");
      if (!department) throw new Error("Department not found");
      return department;
    } catch (error) {
      throw new Error(String(error));
    }
  }
}
