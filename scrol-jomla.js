    const marqueeElement=document.createElement("marquee");marqueeElement.className="marquee",marqueeElement.setAttribute("direction","right"),marqueeElement.setAttribute("behavior","scroll"),marqueeElement.textContent=marqueeContent;const cartIconElement=document.createElement("i");cartIconElement.className="fa-solid fa-cart-shopping",marqueeElement.appendChild(cartIconElement);const anchorElement=document.createElement("a");anchorElement.href=Slink,anchorElement.appendChild(marqueeElement);const targetElement=document.querySelector(".header-container");targetElement&&targetElement.after(anchorElement);const marqueeStyle=document.createElement("style");marqueeStyle.textContent=`
    marquee {
    margin-bottom: -6px;
    font-weight: bold;
    color: var(--primary-color);
    width: 100%;
    text-align: inherit;
    }
`,document.head.appendChild(marqueeStyle);
  
