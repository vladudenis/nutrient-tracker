export function round(num: number) {
    return Math.round(num * 10) / 10
}

const essentialNutrients = [
    'FAT',
    'FASAT',
    'FAMS',
    'FAPU',
    'CHOCDF',
    'PROCNT',
    'CHOLE',
    'NA',
    'CA',
    'MG',
    'K',
    'FE',
    'ZN',
    'P',
    'VITC',
    'THIA',
    'RIBF',
    'NIA',
    'VITB6A',
    'FOLDFE',
    'FOLAC',
    'VITB12',
    'VITD',
]

const essentialMicronutrients = [
    'NA',
    'CA',
    'MG',
    'K',
    'FE',
    'ZN',
    'P',
    'VITC',
    'THIA',
    'RIBF',
    'NIA',
    'VITB6A',
    'FOLDFE',
    'FOLAC',
    'VITB12',
    'VITD',
    'VITA_RAE',
    'TOCPHA',
    'VITK1',
]

export function calculateTotalNutrients(objs: any[] | null | undefined) {
    if (!objs || !objs.length) {
        return null
    }

    const totalObj = JSON.parse(JSON.stringify(objs[0]))

    for (let i = 1; i <= objs.length - 1; i++) {
        const obj = objs[i]

        totalObj.calories += obj.calories
        totalObj.totalWeight += obj.totalWeight

        totalObj.totalNutrients.FAT.quantity +=
            obj.totalNutrients.FAT?.quantity || 0
        totalObj.totalNutrients.FASAT.quantity +=
            obj.totalNutrients.FASAT?.quantity || 0
        totalObj.totalNutrients.FAMS.quantity +=
            obj.totalNutrients.FAMS?.quantity || 0
        totalObj.totalNutrients.FAPU.quantity +=
            obj.totalNutrients.FAPU?.quantity || 0
        totalObj.totalNutrients.CHOCDF.quantity +=
            obj.totalNutrients.CHOCDF?.quantity || 0
        totalObj.totalNutrients.PROCNT.quantity +=
            obj.totalNutrients.PROCNT?.quantity || 0
        totalObj.totalNutrients.CHOLE.quantity +=
            obj.totalNutrients.CHOLE?.quantity || 0
        totalObj.totalNutrients.FIBTG.quantity +=
            obj.totalNutrients.FIBTG?.quantity || 0

        totalObj.totalDaily.ENERC_KCAL.quantity +=
            obj.totalDaily.ENERC_KCAL?.quantity || 0
        totalObj.totalDaily.FAT.quantity += obj.totalDaily.FAT?.quantity || 0
        totalObj.totalDaily.FASAT.quantity +=
            obj.totalDaily.FASAT?.quantity || 0
        totalObj.totalDaily.CHOCDF.quantity +=
            obj.totalDaily.CHOCDF?.quantity || 0
        totalObj.totalDaily.PROCNT.quantity +=
            obj.totalDaily.PROCNT?.quantity || 0
        totalObj.totalDaily.CHOLE.quantity +=
            obj.totalDaily.CHOLE?.quantity || 0
        totalObj.totalDaily.FIBTG.quantity +=
            obj.totalDaily.FIBTG?.quantity || 0

        totalObj.totalNutrients.NA.quantity +=
            obj.totalNutrients.NA?.quantity || 0
        totalObj.totalNutrients.CA.quantity +=
            obj.totalNutrients.CA?.quantity || 0
        totalObj.totalNutrients.MG.quantity +=
            obj.totalNutrients.MG?.quantity || 0
        totalObj.totalNutrients.K.quantity +=
            obj.totalNutrients.K?.quantity || 0
        totalObj.totalNutrients.FE.quantity +=
            obj.totalNutrients.FE?.quantity || 0
        totalObj.totalNutrients.ZN.quantity +=
            obj.totalNutrients.ZN?.quantity || 0
        totalObj.totalNutrients.P.quantity +=
            obj.totalNutrients.P?.quantity || 0
        totalObj.totalNutrients.VITC.quantity +=
            obj.totalNutrients.VITC?.quantity || 0
        totalObj.totalNutrients.THIA.quantity +=
            obj.totalNutrients.THIA?.quantity || 0
        totalObj.totalNutrients.RIBF.quantity +=
            obj.totalNutrients.RIBF?.quantity || 0
        totalObj.totalNutrients.NIA.quantity +=
            obj.totalNutrients.NIA?.quantity || 0
        totalObj.totalNutrients.VITB6A.quantity +=
            obj.totalNutrients.VITB6A?.quantity || 0
        totalObj.totalNutrients.FOLDFE.quantity +=
            obj.totalNutrients.FOLDFE?.quantity || 0
        totalObj.totalNutrients.FOLAC.quantity +=
            obj.totalNutrients.FOLAC?.quantity || 0
        totalObj.totalNutrients.VITB12.quantity +=
            obj.totalNutrients.VITB12?.quantity || 0
        totalObj.totalNutrients.VITD.quantity +=
            obj.totalNutrients.VITD?.quantity || 0
        totalObj.totalNutrients.VITA_RAE.quantity +=
            obj.totalNutrients.VITA_RAE?.quantity || 0
        totalObj.totalNutrients.TOCPHA.quantity +=
            obj.totalNutrients.TOCPHA?.quantity || 0
        totalObj.totalNutrients.VITK1.quantity +=
            obj.totalNutrients.VITK1?.quantity || 0

        totalObj.totalDaily.NA.quantity += obj.totalDaily.NA?.quantity || 0
        totalObj.totalDaily.CA.quantity += obj.totalDaily.CA?.quantity || 0
        totalObj.totalDaily.MG.quantity += obj.totalDaily.MG?.quantity || 0
        totalObj.totalDaily.K.quantity += obj.totalDaily.K?.quantity || 0
        totalObj.totalDaily.FE.quantity += obj.totalDaily.FE?.quantity || 0
        totalObj.totalDaily.ZN.quantity += obj.totalDaily.ZN?.quantity || 0
        totalObj.totalDaily.P.quantity += obj.totalDaily.P?.quantity || 0
        totalObj.totalDaily.VITC.quantity += obj.totalDaily.VITC?.quantity || 0
        totalObj.totalDaily.THIA.quantity += obj.totalDaily.THIA?.quantity || 0
        totalObj.totalDaily.RIBF.quantity += obj.totalDaily.RIBF?.quantity || 0
        totalObj.totalDaily.NIA.quantity += obj.totalDaily.NIA?.quantity || 0
        totalObj.totalDaily.VITB6A.quantity +=
            obj.totalDaily.VITB6A?.quantity || 0
        totalObj.totalDaily.FOLDFE.quantity +=
            obj.totalDaily.FOLDFE?.quantity || 0
        totalObj.totalDaily.VITB12.quantity +=
            obj.totalDaily.VITB12?.quantity || 0
        totalObj.totalDaily.VITD.quantity += obj.totalDaily.VITD?.quantity || 0
        totalObj.totalDaily.VITA_RAE.quantity +=
            obj.totalDaily.VITA_RAE?.quantity || 0
        totalObj.totalDaily.TOCPHA.quantity +=
            obj.totalDaily.TOCPHA?.quantity || 0
        totalObj.totalDaily.VITK1.quantity +=
            obj.totalDaily.VITK1?.quantity || 0
    }

    return totalObj
}

export function getMicronutrientRows(obj: any | null | undefined): string[][] {
    const micronutrients = [['Micronutrient', 'DV%']]

    if (!obj) {
        return micronutrients
    }

    for (const prop in obj.totalDaily) {
        if (essentialMicronutrients.includes(prop)) {
            micronutrients.push([
                obj.totalDaily[prop].label,
                `${Math.round(obj.totalDaily[prop].quantity)}%`,
            ])
        }
    }

    return micronutrients
}

export function calculateCaloricResult(
    rCaloricIntake: number,
    caloricIntake: number
) {
    enum caloricResults {
        SLIGHT_GAIN = 'Slow Weight Gain',
        GAIN = 'Decent Weight Gain',
        EXTREME_GAIN = 'Extreme Weight Gain',
        SLIGHT_LOSS = 'Slow Weight Loss',
        LOSS = 'Decent Weight Loss',
        EXTREME_LOSS = 'Extreme Weight Loss',
        NEUTRAL = 'Weight Maintenance',
    }

    const prcntDiff = caloricIntake / rCaloricIntake
    let result

    if (prcntDiff >= 1.4) {
        result = caloricResults.EXTREME_GAIN
    } else if (prcntDiff <= 0.6) {
        result = caloricResults.EXTREME_LOSS
    } else if (prcntDiff >= 1.2 && prcntDiff <= 1.4) {
        result = caloricResults.GAIN
    } else if (prcntDiff <= 0.8 && prcntDiff >= 0.6) {
        result = caloricResults.LOSS
    } else if (prcntDiff >= 1.1 && prcntDiff <= 1.2) {
        result = caloricResults.SLIGHT_GAIN
    } else if (prcntDiff <= 0.9 && prcntDiff >= 0.8) {
        result = caloricResults.SLIGHT_LOSS
    } else {
        result = caloricResults.NEUTRAL
    }

    return result
}

export function calculateDailyTargetProgress(actual: number, target: number) {
    enum caloricResults {
        SLIGHT_OVERSHOOT = 'text-yellow-500',
        OVERSHOOT = 'text-orange-500',
        EXTREME_OVERSHOOT = 'text-red-500',
        SLIGHT_UNDERSHOOT = 'text-yellow-500',
        UNDERSHOOT = 'text-orange-500',
        EXTREME_UNDERSHOOT = 'text-red-500',
        BULLSEYE = 'text-emerald-500',
    }

    const prcntDiff = actual / target
    let result

    if (prcntDiff >= 1.4) {
        result = caloricResults.EXTREME_OVERSHOOT
    } else if (prcntDiff <= 0.6) {
        result = caloricResults.EXTREME_UNDERSHOOT
    } else if (prcntDiff >= 1.2 && prcntDiff <= 1.4) {
        result = caloricResults.OVERSHOOT
    } else if (prcntDiff <= 0.8 && prcntDiff >= 0.6) {
        result = caloricResults.UNDERSHOOT
    } else if (prcntDiff >= 1.1 && prcntDiff <= 1.2) {
        result = caloricResults.SLIGHT_OVERSHOOT
    } else if (prcntDiff <= 0.9 && prcntDiff >= 0.8) {
        result = caloricResults.SLIGHT_UNDERSHOOT
    } else {
        result = caloricResults.BULLSEYE
    }

    return result
}
