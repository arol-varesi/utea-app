
var ComponentA = {
  props: ['columns', 'data'],
  data: function () {
    return {
      name: 'prova'
    }
  },
  template:
    `
    <div class="q-pa-md q-gutter-sm">
      <q-btn color="primary" icon="mail" label="On Left" />
      <q-btn color="secondary" icon-right="mail" label="On Right" />
      <q-btn color="red" icon="mail" icon-right="send" label="On Left and Right" />
      <br>
      <div class="q-pa-md">
        <q-table
          title="Treats"
          :data="data"
          :columns="columns"
          row-key="name">
        </q-table>
    </div>
    </div>
    `
}
exports.ComponentA = ComponentA
