export function formatPrice(price) {
  return new Intl.NumberFormat('en-LY', { style: 'currency', currency: 'LYD' }).format(price)
}

export function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase()
}
