import { ciede2000 } from './colorDifference'
import { LabColor } from './types'

/**
 * CIEDE2000 tests the diff.cie2000.
 * Cases taken from the paper "The CIEDE2000 Color-Difference Formula:
 * Implementation Notes, Supplementary Test Data, and Mathematical Observations"
 * by Gaurav Sharma, Wencheng Wu and Edul N. Dalal.
 */
describe('diff', function() {
  describe('#ciede2000()', function() {
    test('should use the true chroma difference (#1)', function() {
      assertCiede2000Diff(
        2.0425,
        { L: 50.0, a: 2.6772, b: -79.7751 },
        { L: 50.0, a: 0.0, b: -82.7485 }
      )
    })
    test('should use the true chroma difference (#2)', function() {
      assertCiede2000Diff(
        2.8615,
        { L: 50.0, a: 3.1571, b: -77.2803 },
        { L: 50.0, a: 0.0, b: -82.7485 }
      )
    })
    test('should use the true chroma difference (#3)', function() {
      assertCiede2000Diff(
        3.4412,
        { L: 50.0, a: 2.8361, b: -74.02 },
        { L: 50.0, a: 0.0, b: -82.7485 }
      )
    })
    test('should use the true hue difference (#4)', function() {
      assertCiede2000Diff(
        1.0,
        { L: 50.0, a: -1.3802, b: -84.2814 },
        { L: 50.0, a: 0.0, b: -82.7485 }
      )
    })
    test('should use the true hue difference (#5)', function() {
      assertCiede2000Diff(
        1.0,
        { L: 50.0, a: -1.1848, b: -84.8006 },
        { L: 50.0, a: 0.0, b: -82.7485 }
      )
    })
    test('should use the true hue difference (#6)', function() {
      assertCiede2000Diff(
        1.0,
        { L: 50.0, a: -0.9009, b: -85.5211 },
        { L: 50.0, a: 0.0, b: -82.7485 }
      )
    })
    test('should use the correct arctangent computation (#7)', function() {
      assertCiede2000Diff(2.3669, { L: 50.0, a: 0.0, b: 0.0 }, { L: 50.0, a: -1.0, b: 2.0 })
    })
    test('should use the correct arctangent computation (#8)', function() {
      assertCiede2000Diff(2.3669, { L: 50.0, a: -1.0, b: 2.0 }, { L: 50.0, a: 0.0, b: 0.0 })
    })
    test('should use the correct arctangent computation (#9)', function() {
      assertCiede2000Diff(7.1792, { L: 50.0, a: 2.49, b: -0.001 }, { L: 50.0, a: -2.49, b: 0.0009 })
    })
    test('should use the correct arctangent computation (#10)', function() {
      assertCiede2000Diff(7.1792, { L: 50.0, a: 2.49, b: -0.001 }, { L: 50.0, a: -2.49, b: 0.001 })
    })
    test('should use the correct arctangent computation (#11)', function() {
      assertCiede2000Diff(7.2195, { L: 50.0, a: 2.49, b: -0.001 }, { L: 50.0, a: -2.49, b: 0.0011 })
    })
    test('should use the correct arctangent computation (#12)', function() {
      assertCiede2000Diff(7.2195, { L: 50.0, a: 2.49, b: -0.001 }, { L: 50.0, a: -2.49, b: 0.0012 })
    })
    test('should use the correct arctangent computation (#13)', function() {
      assertCiede2000Diff(4.8045, { L: 50.0, a: -0.001, b: 2.49 }, { L: 50.0, a: 0.0009, b: -2.49 })
    })
    test('should use the correct arctangent computation (#14)', function() {
      assertCiede2000Diff(4.8045, { L: 50.0, a: -0.001, b: 2.49 }, { L: 50.0, a: 0.001, b: -2.49 })
    })
    test('should use the correct arctangent computation (#15)', function() {
      assertCiede2000Diff(4.7461, { L: 50.0, a: -0.001, b: 2.49 }, { L: 50.0, a: 0.0011, b: -2.49 })
    })
    test('should use the correct arctangent computation (#16)', function() {
      assertCiede2000Diff(4.3065, { L: 50.0, a: 2.5, b: 0.0 }, { L: 50.0, a: 0.0, b: -2.5 })
    })
    test('should work for large color differences (#17)', function() {
      assertCiede2000Diff(27.1492, { L: 50.0, a: 2.5, b: 0.0 }, { L: 73.0, a: 25.0, b: -18.0 })
    })
    test('should work for large color differences (#18)', function() {
      assertCiede2000Diff(22.8977, { L: 50.0, a: 2.5, b: 0.0 }, { L: 61.0, a: -5.0, b: 29.0 })
    })
    test('should work for large color differences (#19)', function() {
      assertCiede2000Diff(31.903, { L: 50.0, a: 2.5, b: 0.0 }, { L: 56.0, a: -27.0, b: -3.0 })
    })
    test('should work for large color differences (#20)', function() {
      assertCiede2000Diff(19.4535, { L: 50.0, a: 2.5, b: 0.0 }, { L: 58.0, a: 24.0, b: 15.0 })
    })
    test('should produce numbers found in the CIE technical report (#21)', function() {
      assertCiede2000Diff(1.0, { L: 50.0, a: 2.5, b: 0.0 }, { L: 50.0, a: 3.1736, b: 0.5854 })
    })
    test('should produce numbers found in the CIE technical report (#22)', function() {
      assertCiede2000Diff(1.0, { L: 50.0, a: 2.5, b: 0.0 }, { L: 50.0, a: 3.2972, b: 0.0 })
    })
    test('should produce numbers found in the CIE technical report (#23)', function() {
      assertCiede2000Diff(1.0, { L: 50.0, a: 2.5, b: 0.0 }, { L: 50.0, a: 1.8634, b: 0.5757 })
    })
    test('should produce numbers found in the CIE technical report (#24)', function() {
      assertCiede2000Diff(1.0, { L: 50.0, a: 2.5, b: 0.0 }, { L: 50.0, a: 3.2592, b: 0.335 })
    })
    test('should produce numbers found in the CIE technical report (#25)', function() {
      assertCiede2000Diff(
        1.2644,
        { L: 60.2574, a: -34.0099, b: 36.2677 },
        { L: 60.4626, a: -34.1751, b: 39.4387 }
      )
    })
    test('should produce numbers found in the CIE technical report (#26)', function() {
      assertCiede2000Diff(
        1.263,
        { L: 63.0109, a: -31.0961, b: -5.8663 },
        { L: 62.8187, a: -29.7946, b: -4.0864 }
      )
    })
    test('should produce numbers found in the CIE technical report (#27)', function() {
      assertCiede2000Diff(
        1.8731,
        { L: 61.2901, a: 3.7196, b: -5.3901 },
        { L: 61.4292, a: 2.248, b: -4.962 }
      )
    })
    test('should produce numbers found in the CIE technical report (#28)', function() {
      assertCiede2000Diff(
        1.8645,
        { L: 35.0831, a: -44.1164, b: 3.7933 },
        { L: 35.0232, a: -40.0716, b: 1.5901 }
      )
    })
    test('should produce numbers found in the CIE technical report (#29)', function() {
      assertCiede2000Diff(
        2.0373,
        { L: 22.7233, a: 20.0904, b: -46.694 },
        { L: 23.0331, a: 14.973, b: -42.5619 }
      )
    })
    test('should produce numbers found in the CIE technical report (#30)', function() {
      assertCiede2000Diff(
        1.4146,
        { L: 36.4612, a: 47.858, b: 18.3852 },
        { L: 36.2715, a: 50.5065, b: 21.2231 }
      )
    })
    test('should produce numbers found in the CIE technical report (#31)', function() {
      assertCiede2000Diff(
        1.4441,
        { L: 90.8027, a: -2.0831, b: 1.441 },
        { L: 91.1528, a: -1.6435, b: 0.0447 }
      )
    })
    test('should produce numbers found in the CIE technical report (#32)', function() {
      assertCiede2000Diff(
        1.5381,
        { L: 90.9257, a: -0.5406, b: -0.9208 },
        { L: 88.6381, a: -0.8985, b: -0.7239 }
      )
    })
    test('should produce numbers found in the CIE technical report (#33)', function() {
      assertCiede2000Diff(
        0.6377,
        { L: 6.7747, a: -0.2908, b: -2.4247 },
        { L: 5.8714, a: -0.0985, b: -2.2286 }
      )
    })
    test('should produce numbers found in the CIE technical report (#34)', function() {
      assertCiede2000Diff(
        0.9082,
        { L: 2.0776, a: 0.0795, b: -1.135 },
        { L: 0.9033, a: -0.0636, b: -0.5514 }
      )
    })
    test('Same color should have 0.0 difference #1', function() {
      assertCiede2000Diff(0.0, { L: 100, a: 0.005, b: -0.01 }, { L: 100, a: 0.005, b: -0.01 })
    })
    test('Same color should have 0.0 difference #2', function() {
      assertCiede2000Diff(0.0, { L: 0.0, a: 0.0, b: 0.0 }, { L: 0.0, a: 0.0, b: 0.0 })
    })
    test('Black and white are very different', function() {
      assertCiede2000Diff(100.0, { L: 100, a: 0.005, b: -0.01 }, { L: 0.0, a: 0.0, b: 0.0 })
    })
    //  TODO:
    // test('should throw error', function() {
    //   assert.throws(function() {
    //     color_diff.ciede2000({ L: NaN, a: NaN, b: NaN }, { L: 0, a: 0, b: 0 })
    //   }, Error)
    // })
  })
})

function round(n: number) {
  return Math.round(n * 10000) / 10000
}

function assertCiede2000Diff(expected: number, c1: LabColor, c2: LabColor) {
  expect(expected).toEqual(round(ciede2000(c1, c2)))
  expect(expected).toEqual(round(ciede2000(c2, c1)))
}
