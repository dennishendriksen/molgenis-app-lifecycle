// @flow
/* Utilities */
import sortArray from '../util/sortArray'

/* Flow types */
import type { LifeCycleState } from '../flow.types'

export default {
  'SET_COHORTS' (state: LifeCycleState, cohorts: Array<String>) {
    state.cohorts = cohorts
  },

  'SET_ERROR' (state: LifeCycleState, error: string) {
    state.error = error
  },

  'SET_HARMONIZATION_DATA' (state: LifeCycleState, harmonizationData: Array<Object>) {
    state.harmonizationData = harmonizationData
  },

  'SET_HARMONIZATION_METADATA' (state: LifeCycleState, harmonizationMetadata: Object) {
    state.harmonizationMetadata = harmonizationMetadata
  },

  'SET_SELECTED_NODE' (state: LifeCycleState, selectedNode: Object) {
    state.selectedNodeLabel = selectedNode.value
    state.selectedNodeVariables = sortArray(selectedNode.variables, 'variable')
  },

  'SET_TREE_MENU' (state: LifeCycleState, treeMenu: Array<Object>) {
    state.treeMenu = treeMenu
  }
}
