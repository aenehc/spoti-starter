var React               = require('React'),
    ContainerComponent  = require('./components/containerComponent.react.jsx');

var base = {};


base.init = function () {
  React.render(
    <ContainerComponent />,
    document.getElementsByClassName('app')[0]
  );
};

module.exports = base;
