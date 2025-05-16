const ShareWidget = ({ recipe }) => {
  const currentUrl = window.location.href;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      alert("Link copied to clipboard!");
    } catch (err) {
      alert("Failed to copy link!");
    }
  };

  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
            <html>
                <head>
                    <title>${recipe.recipeTitle}</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        h1 { font-size: 2em; }
                        h2 { font-size: 1.5em; }
                        p { font-size: 1em; }
                        img { max-width: 20%; max-height: 25%; }
                    </style>
                </head>
                <body>
                    <h1>${recipe.recipeTitle}</h1>
                    <img src="${recipe.recipeImage?.fields.file.url}" alt="" />
                    ${recipe.recipeDescription?.content
                      .map((item) => `<p>${item.content[0].value}</p>`)
                      .join("")}
                    <h2>Ingredients</h2>
                    <ul>
                    ${recipe.recipeIngredients
                      ?.map((ingredient) => `<li>${ingredient}</li>`)
                      .join("")}
                    </ul>
                    <h2>Instructions</h2>
                    <ol>
                    ${recipe.recipeInstructions
                      ?.map((instruction) => `<li>${instruction}</li>`)
                      .join("")}
                    </ol>
                </body>
            </html>
        `);
    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  return (
    <div className="flex items-center space-x-4 p-4 max-w-fit">
      <i
        onClick={handlePrint}
        className="fas fa-print px-4 py-2 rounded-lg bg-blue-700 text-white hover:bg-blue-800 transition"
      />
      <i
        onClick={handleCopyLink}
        className=" fas fa-link px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition"
      />
    </div>
  );
};

export default ShareWidget;
