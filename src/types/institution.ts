export interface Institution {
  srNo: number;
  aictePermanentId: string;
  instituteName: string;
  region: string;
  state: string;
  district: string;
  city: string;
  userGroup: string;
}

export type InstitutionSearchFilters = {
  q?: string;
  state?: string;
  city?: string;
  region?: string;
  group?: string;
  id?: string;
  page?: number;
  pageSize?: number;
  sort?: "name" | "state" | "city" | "region";
};
