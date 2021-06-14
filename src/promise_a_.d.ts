import type { project_T } from './project_T';
export declare function promise_a_<O extends unknown = unknown>(projects: project_T[], _promise: (project: project_T) => Promise<O>): Promise<O>[];
