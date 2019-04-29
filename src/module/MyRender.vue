
<script>
export default {
  functional: true,
  props: {
    row: Object,
    render: Function,
    index:Number,
    rowIndex:Number
  },
  render: (h, ctx) => {
    const params = {
      row: ctx.props.row,
      index: ctx.props.index,
      rowIndex:ctx.props.rowIndex
    };
    return ctx.props.render(h, params);
  }
};
</script>