export type Units = Record<string, string>

export const massFlowUnits: Units = {
    kgs: 'kg/s',
    kgh: 'kg/h',
    kgday: 'kg/day',
    lbs: 'lb/s',
    lbh: 'lb/h',
    lbday: 'lb/day',
    tnyear: 'tonne/year'
}

export const volumeFlowUnits: Units = {
    m3h: 'm³/h',
    m3day: 'm³/day',
    ft3h: 'ft³/h',
    ft3day: 'ft³/day',
    galh: 'gal/h',
    galday: 'gal/day',
    m3s: 'm³/s',
    ft3s: 'ft³/s',
    gals: 'gal/s'
}

export const sVolumeFlowUnits: Units = {
    SCMD: 'SCMD',
    MSCMD: 'MSCMD',
    MMSCMD: 'MMSCMD',
    SCFD: 'SCFD',
    MSCFD: 'MSCFD',
    MMSCFD: 'MMSCFD'
}

export const densityUnits = {
    kgm3: 'kg/m³',
    lbft3: 'lb/ft³',
    gmcm3: 'g/cm³',
    kgft3: 'kg/ft³',
    lbm3: 'lb/m³'
}

export const viscosityUnits = {
    cP: 'cP',
    PaS: 'Pa·s',
    lbftsh: 'lb·ft/s·h',
    kgmsh: 'kg/m·s·h',
    lbftsft: 'lb·ft/s·ft',
    kgmsm: 'kg/m·s·m'
}

export const surfaceTensionUnits = {
    mNm: 'mN/m',
    Nm: 'N/m',
    dynescm: 'dyne/cm',
    lbfft: 'lb/ft',
    ozfin: 'ozf/in',
    lbfin: 'lb/in'
}

export const temperatureUnits: Units = {
    celsius: '°C',
    fahrenheit: '°F',
    kelvin: 'K'
}

export const pressureUnits: Units = {
    pascal: 'Pa',
    kilopascal: 'kPa',
    megapascal: 'MPa',
    bar: 'bar',
    atmosphere: 'atm',
    psi: 'psi',
    kgcm2: 'kg/cm²'
}

export const diameterUnits: Units = {
    millimeter: 'mm',
    centimeter: 'cm',
    meter: 'm',
    inch: 'in',
    foot: 'ft'
}

export const areaUnits: Units = {
    squareMeter: 'm²',
    squareKilometer: 'km²',
    squareInch: 'in²',
    squareFoot: 'ft²',
    squareMillimeter: 'mm²',
    squareCentimeter: 'cm²'
}

export const velocityUnits: Units = {
    metersPerSecond: 'm/s',
    metersPerHour: 'm/h',
    kilometersPerHour: 'km/h',
    feetPerSecond: 'ft/s',
    feetPerHour: 'ft/h',
    milesPerHour: 'mph',
    millimetersPerSecond: 'mm/s',
    centimetersPerSecond: 'cm/s'
}

export const maxAllowanceStressUnits: Units = {
    psi: 'psi',
    megapascal: 'MPa',
    kilopascal: 'kPa',
    kgcm2: 'kg/cm²'
}

export const thicknessUnits: Units = {
    millimeter: 'mm',
    centimeter: 'cm',
    inch: 'in'
}

export const volumeUnits: Units = {
    m3: 'm³',
    ft3: 'ft³',
    gal: 'gal',
    liter: 'L',
    cm3: 'cm³'
}

export const weightUnits: Units = {
    kg: 'kg',
    lb: 'lb',
    g: 'g',
    ton: 'ton',
    mg: 'mg'
}
