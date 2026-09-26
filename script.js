const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.snack-card');
const emptyMessage = document.querySelector('.empty-message');
const dealButton = document.querySelector('#dealButton');
let saleShown = false;

filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle('active', item === button));
    let visible = 0;
    cards.forEach((card) => {
      const show = category === 'all' || card.dataset.category === category;
      card.hidden = !show;
      if (show) visible += 1;
    });
    emptyMessage.hidden = visible !== 0;
  });
});

dealButton.addEventListener('click', () => {
  saleShown = !saleShown;
  cards.forEach((card) => {
    const price = card.querySelector('.card-info strong');
    const regular = Number(price.dataset.regular || price.textContent.replace('$', ''));
    price.dataset.regular = regular;
    price.innerHTML = saleShown
      ? `<span class="sale-price">$${regular.toFixed(2)}</span><span class="new-price">$${(regular * 0.75).toFixed(2)}</span>`
      : `$${regular.toFixed(2)}`;
  });
  dealButton.textContent = saleShown ? 'Show regular prices' : 'See Friday prices';
  dealButton.classList.toggle('active', saleShown);
});
