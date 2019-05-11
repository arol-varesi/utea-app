<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="primary" icon="mail" label="On Left"></q-btn>
    <q-btn color="secondary" icon-right="mail" label="On Right"></q-btn>
    <q-btn color="red" icon="mail" icon-right="send" label="On Left and Right"></q-btn>
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
</template>

<script>
export default {
  name: 'prova',
  data: function () {
    return {
      name: 'prova',
      columns: [
        { name: 'A', label: 'A', field: 'A', sortable: true},
        { name: 'B', label: 'B', field: 'B', sortable: true},
        { name: 'C', label: 'C', field: 'C', sortable: true},
        { name: 'D', label: 'D', field: 'D', sortable: true},
      ],
      data: [
        { A: 132, B: 4, C: 66, D: "arios" },
        { A: 426, B: 15, C: 91, D: "mionas" },
        { A: 635, B: 7, C: 83, D: "ciccios" },
        { A: 702, B: 11, C: 21, D: "freus" },
        { A: 387, B: 9, C: 80, D: "barus" },
        { A: 901, B: 3, C: 54, D: "nonas" },
      ]
    }
  }
}
</script>


<style scoped>

</style>
