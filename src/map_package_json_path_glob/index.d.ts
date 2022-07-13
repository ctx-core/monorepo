export declare function map_package_json_path_glob<Out extends unknown = unknown>(
	glob_txt:string, fn:(path:string)=>Out
):Promise<Out[]>
