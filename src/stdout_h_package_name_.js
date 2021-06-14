export function stdout_h_package_name_(package_name_a, stdout_a2) {
    const package_name_stdout = {};
    for (let i = 0; i < package_name_a.length; i++) {
        const package_name = package_name_a[i];
        package_name_stdout[package_name] = stdout_a2[i];
    }
    return package_name_stdout;
}
//# sourceMappingURL=src/stdout_h_package_name_.js.map