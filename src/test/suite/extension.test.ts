import * as assert from 'assert'
import * as vscode from 'vscode'
import { parseFocusLine } from '../../util'

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')

  test('timestamp(s) to date', () => {
    assert.equal('Friday, 2020/05/01, 08:00:00', parseFocusLine('1588291200'))
  })

  test('timestamp(ms) to date', () => {
    assert.equal('Saturday, 2020/05/02, 13:52:45', parseFocusLine('1588398765432'))
  })

  test('date 2 timestamp', () => {
    assert.equal('timestamp in second: 1588291200', parseFocusLine('2020-05-01'))
  })

  test('datetime 2 timestamp', () => {
    assert.equal('timestamp in second: 1588339830', parseFocusLine('2020-05-01T21:30:30'))
  })

  test('now', () => {
    // mock `Date.now` to Friday, 2020/05/01, 08:01:27
    Date.now = () => 1588291287654
    assert.equal('Friday, 2020/05/01, 08:01:27 | 1588291287.654', parseFocusLine('now'))
  })
})
