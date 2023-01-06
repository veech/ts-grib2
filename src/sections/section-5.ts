import { Buffer } from 'buffer/'

import { lookupTable50 } from '../tables/table-5'
import { getTemplate5, lookupTemplate5 } from '../templates/template-5'

export type DataRepresentationSectionValues = ReturnType<typeof parseSection5>
export type DataRepresentationSection = ReturnType<typeof lookupSection5>

/**
 *  Data Representation Section
 *
 * [Read more...](https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect5.shtml)
 */
export const parseSection5 = (section: Buffer) => {
  const dataRepresentationTemplate = section.readUInt16BE(9)
  const template = getTemplate5(dataRepresentationTemplate)
  const dataRepresentation = template(section)

  return {
    /** Number of GRIB section */
    sectionNumber: section.readUInt8(4),
    /** Name of Grib section */
    sectionName: 'Data Representation Section',
    /** Length of GRIB section */
    length: section.readUInt32BE(0),
    /** Section 5 Contents */
    contents: {
      /** Number of data points where one or more values are specified in Section 7 when a bit map is present, total number of data points when a bit map is absent. */
      numberOfDataPoints: section.readUInt32BE(5),
      /** Data representation template number (See [Table 5.0](https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table5-0.shtml)) */
      dataRepresentationTemplate,
      /** Data representation */
      dataRepresentation
    }
  }
}

/**
 *
 * @param drs Data Representation Section
 * @returns Data Representation Section with corresponding string values
 */
export const lookupSection5 = (drs: DataRepresentationSectionValues) => {
  const { dataRepresentationTemplate, dataRepresentation } = drs.contents

  return {
    ...drs,
    contents: {
      ...drs.contents,
      /** Data representation template */
      dataRepresentationTemplate: lookupTable50(dataRepresentationTemplate),
      /** Data representation */
      dataRepresentation: lookupTemplate5(dataRepresentationTemplate)(dataRepresentation as any)
    }
  }
}
