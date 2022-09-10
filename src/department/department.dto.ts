export interface CreateDepartmentInput {
  name: string;
  hod: string;
}

export interface UpdateDepartmentInput extends Partial<CreateDepartmentInput> {
  id: string;
}

export interface UpdateDepartmentHODInput {
  id: string;
  hod: string;
}

export interface AddMembersInput {
  id: string;
  members: string[];
}

export interface RemoveMemberInput {
  id: string;
  member: string;
}
