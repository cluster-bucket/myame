(function () {
  var editor = ace.edit('editor');
  editor.setTheme('ace/theme/monokai');
  editor.getSession().setMode('ace/mode/markdown');
  editor.renderer.setShowGutter(false);
})();
