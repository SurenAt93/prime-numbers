import { saveInUrl } from 'utils';
import config from 'config';

const createSnapshot = ({ state }) => {
  saveInUrl(JSON.stringify(state));
};

const setIsEditorReady = ({ state }, isReady) => {
  state.isEditorReady = isReady;
};

const setCustomFormula = async ({ state, actions, effects }, formula) => {
  actions.setIsRunnerActive(true);
  const result = await effects.calculate.cutomSequence(formula, state.range, config.defaultFnName);

  if (result.error) {
    actions.showNotification({ message: result.error, variant: 'error' });
  } else {
    state.custom.formula = formula;
    state.custom.sequnce = result.value;
    if (!state.custom.show) {
      actions.showNotification({ message: config.messages.switchCustomToOn, variant: 'info' });
    }
  }

  actions.setIsRunnerActive(false);
};

const setIsRunnerActive = ({ state }, status) => {
  state.isRunnerActive = status;
}

const switchPrimeNumbersView = ({ state: { primeNumbers } }, show) => {
  primeNumbers.show = show;
};

const switchPrimeLowerBoundView = ({ state: { primeLowerBound } }, show) => {
  primeLowerBound.show = show;
};

const switchPrimeUpperBoundView = ({ state: { primeUpperBound } }, show) => {
  primeUpperBound.show = show;
};

const switchCustomView = ({ state: { custom } }, show) => {
  custom.show = show;
};

const setRange = ({ state: { range }}, to, from = 1) => {
  if (to !== range.to || from !== range.from) {
    range.from = from;
    range.to = to;
  }
};

const showNotification = ({ state }, { message, variant = 'info', opt = {} }) => {
  state.notifications = {
    isActive: true,
    message,
    variant,
    opt,
  }; // now designed for only one message
};

const hideNotification = ({ state }) => {
  state.notifications = config.notifications.defaultState;
};

export {
  switchPrimeNumbersView,
  switchPrimeLowerBoundView,
  switchPrimeUpperBoundView,
  hideNotification,
  setIsRunnerActive,
  switchCustomView,
  setRange,
  showNotification,
  createSnapshot,
  setIsEditorReady,
  setCustomFormula,
};
