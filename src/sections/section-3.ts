import { getTemplate } from '../templates'

/**
 *  Grid Definition Section
 *
 * [Read more...](https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect3.shtml)
 */
export const parseSection3 = (section: Buffer) => {
  const gridDefinitionTemplate = section.readUInt16BE(12)
  const gridTemplateValues = getTemplate(`3.${gridDefinitionTemplate}`)(section)

  return {
    /** Number of GRIB section */
    sectionNumber: section.readUInt8(4),
    /** Length of GRIB section */
    length: section.readUInt32BE(0),
    /** Section 3 Data */
    data: {
      /** Number of data points */
      numberPoints: section.readUInt32BE(6),
      /** Grid definition template number [Table 3.1](https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table3-1.shtml)*/
      gridDefinitionTemplate,
      ...gridTemplateValues
    }
  }
}