describe('add todo', function () {
    let page;

    before (async function () {
      page = await browser.newPage();
      await page.goto('http://127.0.0.1:3000/');
    });
  
    after (async function () {
      await page.close();
    });

    it('should have correct title', async function() {
        expect(await page.title()).to.eql('React App');
    })
    it('should have same num of task', async function() {
      let newList = await page.waitFor('#newlist');
      const expectnewnum = await page.evaluate(newList => newList.children.length, newList);
      let doneList = await page.waitFor('#donelist');
      const expectdonenum = await page.evaluate(doneList =>doneList.children.length, doneList);
      expect(expectnewnum+expectdonenum).to.eql(4)
    })
    it('should new todo correct', async function() {
      await page.click('#new-todo', {delay: 500});
      await page.type('#new-todo', 'new todo item', {delay: 50});
      await page.click('#add-button', {delay: 50});
      let todoList = await page.waitFor('#newlist');
      const expectInputContent = await page.evaluate(todoList => todoList.lastChild.textContent, todoList);
      expect(expectInputContent).to.eql('new todo item');
    }) 
    it('should done todo correct', async function() {
      await page.click('#done-todo', {delay: 500});
      await page.type('#done-todo', 'new todo item', {delay: 50});
      await page.click('#done-button', {delay: 50});
      let todoList = await page.waitFor('#donelist');
      const expectDoneContent = await page.evaluate(todoList => todoList.lastChild.textContent, todoList)
      expect(expectDoneContent).to.eql('new todo item')
    })

  });