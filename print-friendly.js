const clipBoardInput = document.createElement('input');
clipBoardInput.setAttribute('class', 'clipBoardInput');
clipBoardInput.setAttribute('readonly', 'true');
document.body.prepend(clipBoardInput);

const clipBoardLabel = document.createElement('label');
clipBoardLabel.setAttribute('class', 'clipBoardLabel');
clipBoardLabel.innerHTML = '📋 Copied to Clip Board';
document.body.prepend(clipBoardLabel);

function copyPageTitleToClipBoard(text) {
  var copyText =
    text ||
    document
      .querySelector('.ant-menu-item.ant-menu-item-selected.ant-menu-item-only-child')
      ?.innerText.replace(/\n/g, ' ') ||
    document.title;
  clipBoardInput.value = copyText;
  clipBoardInput.select();
  document.execCommand('copy');
}

const style = document.createElement('style');
style.innerHTML = `
body {
  position:relative;
}
.clipBoardLabel {
  position: fixed;
  top: 0;
  right:10px;
  z-index: 100000000000;
  width:600px;
  font-size: 20px;
  margin:5px;
}
.clipBoardInput {
  background: #E5E5E5;
  position: fixed;
  top: 30px;
  right:10px;
  z-index: 100000000000;
  font-size: 15px;
  padding:10px;
  margin:5px;
  width:600px;
}
.clipBoardInput::selection {
  color:black;
  background: #E5E5E5;
}

.print-cta {
  position: fixed;
  top: 0;
  left:10px;
  z-index: 100000000000;
  font-size: 30px;
  padding:10px;
  margin:5px;
  width:250px;
  cursor:pointer;
}
header, footer {
  display:none !important;
}

@media print {
aside,header, footer {
  display:none !important;
}
aside+section {
  margin-left:0 !important;
  margin:0 !important;
}
main {
  margin-top:0 !important;
}

section.ant-layout-has-sider{
  padding: 0 !important;
}



  figure,pre {
    page-break-inside: avoid;
    page-break-before: auto;
  }
  .print-cta ,.clipBoardInput, .clipBoardLabel{
    display:none;
  }
  @page { margin: 2cm }
}
`;
document.head.append(style);
const jqueryScript = document.createElement('script');
jqueryScript.setAttribute('src', 'https://code.jquery.com/jquery-3.6.1.min.js');

// jqueryScript.setAttribute('onload','smoothScrollAndPrint()');

document.head.appendChild(jqueryScript);

const smoothScrollAndPrint = () => {
  $('html,body')
    .animate({ scrollTop: $(document).height() }, 15000)
    .promise()
    .done(() => {
      console.log('scrolling complete....printing now');

      window.print();
    });
};

const printCTA = document.createElement('button');
printCTA.innerHTML = '🖨 PRINT';
printCTA.setAttribute('onclick', 'smoothScrollAndPrint()');
printCTA.setAttribute('class', 'print-cta');

document.body.prepend(printCTA);

Array.from(document.querySelectorAll('.ant-menu-title-content')).forEach((item) => {
  item.addEventListener('click', (event) => {
    copyPageTitleToClipBoard(item.innerText.replace(/\n/g, ' '));
  });
});

copyPageTitleToClipBoard();
