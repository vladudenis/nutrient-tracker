export function calculateTotal(objs: any[] | null) {
  if (!objs) {
    return null;
  }

  const totalObj = JSON.parse(JSON.stringify(objs[0]));

  for (let i = 1; i <= objs.length - 1; i++) {
    const obj = objs[i];

    totalObj.calories += obj.calories;
    totalObj.totalWeight += obj.totalWeight;

    totalObj.totalNutrients.FAT.quantity +=
      obj.totalNutrients.FAT?.quantity || 0;
    totalObj.totalNutrients.FASAT.quantity +=
      obj.totalNutrients.FASAT?.quantity || 0;
    totalObj.totalNutrients.FAMS.quantity +=
      obj.totalNutrients.FAMS?.quantity || 0;
    totalObj.totalNutrients.FAPU.quantity +=
      obj.totalNutrients.FAPU?.quantity || 0;
    totalObj.totalNutrients.CHOCDF.quantity +=
      obj.totalNutrients.CHOCDF?.quantity || 0;
    totalObj.totalNutrients.PROCNT.quantity +=
      obj.totalNutrients.PROCNT?.quantity || 0;
    totalObj.totalNutrients.CHOLE.quantity +=
      obj.totalNutrients.CHOLE?.quantity || 0;

    totalObj.totalDaily.FAT.quantity += obj.totalDaily.FAT?.quantity || 0;
    totalObj.totalDaily.FASAT.quantity += obj.totalDaily.FASAT?.quantity || 0;
    totalObj.totalDaily.CHOCDF.quantity += obj.totalDaily.CHOCDF?.quantity || 0;
    totalObj.totalDaily.PROCNT.quantity += obj.totalDaily.PROCNT?.quantity || 0;
    totalObj.totalDaily.CHOLE.quantity += obj.totalDaily.CHOLE?.quantity || 0;

    totalObj.totalNutrients.NA.quantity += obj.totalNutrients.NA?.quantity || 0;
    totalObj.totalNutrients.CA.quantity += obj.totalNutrients.CA?.quantity || 0;
    totalObj.totalNutrients.MG.quantity += obj.totalNutrients.MG?.quantity || 0;
    totalObj.totalNutrients.K.quantity += obj.totalNutrients.K?.quantity || 0;
    totalObj.totalNutrients.FE.quantity += obj.totalNutrients.FE?.quantity || 0;
    totalObj.totalNutrients.ZN.quantity += obj.totalNutrients.ZN?.quantity || 0;
    totalObj.totalNutrients.P.quantity += obj.totalNutrients.P?.quantity || 0;
    totalObj.totalNutrients.VITC.quantity +=
      obj.totalNutrients.VITC?.quantity || 0;
    totalObj.totalNutrients.THIA.quantity +=
      obj.totalNutrients.THIA?.quantity || 0;
    totalObj.totalNutrients.RIBF.quantity +=
      obj.totalNutrients.RIBF?.quantity || 0;
    totalObj.totalNutrients.NIA.quantity +=
      obj.totalNutrients.NIA?.quantity || 0;
    totalObj.totalNutrients.VITB6A.quantity +=
      obj.totalNutrients.VITB6A?.quantity || 0;
    totalObj.totalNutrients.FOLDFE.quantity +=
      obj.totalNutrients.FOLDFE?.quantity || 0;
    totalObj.totalNutrients.FOLAC.quantity +=
      obj.totalNutrients.FOLAC?.quantity || 0;
    totalObj.totalNutrients.VITB12.quantity +=
      obj.totalNutrients.VITB12?.quantity || 0;
    totalObj.totalNutrients.VITD.quantity +=
      obj.totalNutrients.VITD?.quantity || 0;

    totalObj.totalDaily.NA.quantity += obj.totalDaily.NA?.quantity || 0;
    totalObj.totalDaily.CA.quantity += obj.totalDaily.CA?.quantity || 0;
    totalObj.totalDaily.MG.quantity += obj.totalDaily.MG?.quantity || 0;
    totalObj.totalDaily.K.quantity += obj.totalDaily.K?.quantity || 0;
    totalObj.totalDaily.FE.quantity += obj.totalDaily.FE?.quantity || 0;
    totalObj.totalDaily.ZN.quantity += obj.totalDaily.ZN?.quantity || 0;
    totalObj.totalDaily.P.quantity += obj.totalDaily.P?.quantity || 0;
    totalObj.totalDaily.VITC.quantity += obj.totalDaily.VITC?.quantity || 0;
    totalObj.totalDaily.THIA.quantity += obj.totalDaily.THIA?.quantity || 0;
    totalObj.totalDaily.RIBF.quantity += obj.totalDaily.RIBF?.quantity || 0;
    totalObj.totalDaily.NIA.quantity += obj.totalDaily.NIA?.quantity || 0;
    totalObj.totalDaily.VITB6A.quantity += obj.totalDaily.VITB6A?.quantity || 0;
    totalObj.totalDaily.FOLDFE.quantity += obj.totalDaily.FOLDFE?.quantity || 0;
    totalObj.totalDaily.VITB12.quantity += obj.totalDaily.VITB12?.quantity || 0;
    totalObj.totalDaily.VITD.quantity += obj.totalDaily.VITD?.quantity || 0;
  }

  return totalObj;
}