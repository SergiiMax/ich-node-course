const HTML_ENTITIES = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
    '/': '&frasl;'
}

export function escapeHtml(value) {
    return String(value).replace(/[&<>"/']/g, (char) => HTML_ENTITIES[char]);
}

console.log(escapeHtml('<script>Ваши данные украдены</script>'));