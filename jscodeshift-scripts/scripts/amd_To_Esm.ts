export default (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  const moduleNames = {
    amd: "esri",
    esm: "@arcgis/core",
  };

  const replaceImportName = (value: string) => {
    const { amd, esm } = moduleNames;
    return value.replace(amd, esm);
  };

  const convertImportName = (nodePath) => {
    const { node } = nodePath;
    const { value } = node.source;
    if (value.indexOf("esri") > -1)
      node.source.value = replaceImportName(value);
    return node;
  };

  const importStatements = root.find(j.ImportDeclaration);
  importStatements.replaceWith(convertImportName);

  const convertImportEqualsName = (nodePath) => {
    const { node } = nodePath;
    const { value } = nodePath.node.moduleReference.expression;
    if (value.indexOf("esri") > -1)
      nodePath.node.moduleReference.expression.value = replaceImportName(value);
    return node;
  };

  const importEqualStatements = root.find(j.TSImportEqualsDeclaration);
  importEqualStatements.replaceWith(convertImportEqualsName);

  const convertImports = () => {
    const importRequireStatements = root.find(j.TSImportEqualsDeclaration);
    importRequireStatements.insertAfter((nodePath) => {
      const stringLiteral = nodePath.node.moduleReference.expression.value;
      return j.importDeclaration(
        [j.importDefaultSpecifier(j.identifier(nodePath.node.id.name))],
        j.stringLiteral(stringLiteral)
      );
    });
    importRequireStatements.remove();
  };

  const convertExports = () => {
    const exportEqualStatements = root.find(j.TSExportAssignment);
    exportEqualStatements.insertAfter((nodePath) => {
      const exportName = `${nodePath.node.expression.name}`;
      return j.exportDefaultDeclaration(j.identifier(exportName));
    });

    exportEqualStatements.remove();
  };

  convertImports();
  convertExports();

  return root.toSource();
};
// jscodeshift -t [PATH_TO_SOURCE_FILES]/ [PATH_TO_SCRIPT]/amdToEsm.ts --extensions=ts,tsx --parser=tsx --no-fail-on-error
