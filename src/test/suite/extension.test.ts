import * as assert from 'assert'
import * as vscode from 'vscode'
import { parseFocusLine } from '../../util'

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.')

  test('timestamp(s) to date', () => {
    assert.deepEqual([{
      origin: '1588291200',
      datetime: 'Friday, 2020-05-01T00:00:00.000Z'
    }], parseFocusLine('1588291200'))
  })

  test('timestamp(ms) to date', () => {
    assert.deepEqual([{
      origin: '1588398765432',
      datetime: 'Saturday, 2020-05-02T05:52:45.432Z'
    }], parseFocusLine('1588398765432'))
  })

  test('date 2 timestamp', () => {
    assert.deepEqual([{
      origin: '2020-05-01',
      timestamp: 1588291200
    }], parseFocusLine('2020-05-01'))
  })

  test('datetime 2 timestamp', () => {
    assert.deepEqual([{
      origin: '2020-05-01T21:30:30',
      timestamp: 1588339830
    }], parseFocusLine('2020-05-01T21:30:30'))
  })

  test('now', () => {
    // mock `Date.now` to Friday, 2020-05-01T00:01:27.654Z
    Date.now = () => 1588291287654
    assert.deepEqual([{
      origin: 'now',
      datetime: 'Friday, 2020-05-01T00:01:27.654Z',
      timestamp: 1588291287.654
    }], parseFocusLine('now'))
  })
})
