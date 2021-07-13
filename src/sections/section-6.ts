/**
 *  Bit-Map Section
 *
 * [Read more...](https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_sect6.shtml)
 */
export const parseSection6 = (section: Buffer) => {
  const bitMapIndicator = section.readUInt8(5)

  if (bitMapIndicator !== 255) throw new Error('BitMap Indicator not supported')

  return {
    /** Number of GRIB section */
    sectionNumber: section.readUInt8(4),
    /** Length of GRIB section */
    length: section.readUInt32BE(0),
    /** Section 6 Data */
    data: {
      /** Bit-map indicator (See [Table 6.0](https://www.nco.ncep.noaa.gov/pmb/docs/grib2/grib2_doc/grib2_table6-0.shtml)) */
      bitMapIndicator
    }
  }
}