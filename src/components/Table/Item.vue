<script>
export default {
    name: 'Item',
    functional: true,
    props: {
        scope: Object,
        render: Function
    },
    render(h, context) {
        return context.props.render ? context.props.render(h, context.props.scope) : null
    }
}
</script>