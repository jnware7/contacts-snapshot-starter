var url = "http://localhost:3000/"

casper.test.begin('Testing the page status', function(test){
  casper.start(url,function(){
    test.assertHttpStatus(200,'Page is up and running')
  })
  casper.then(function(){
    test.assert(casper.getCurrentUrl() === url, 'URL is the one expected')
  })
  casper.then(function(){
    test.assertTextExists('Jared','Jared has not been removed')
    test.assertTextExists('Tanner','Tanner has not been removed')
  })
  casper.thenEvaluate(function(){
    document.querySelector('.delete-contact').click('.delete-contact')
  })
  casper.then(function(){
    test.assertTextDoesntExist('Jared','Jared has been removed')
    test.assertTextExists('Tanner','Tanner has not been removed')
  })
  casper.run(function(){
    test.done()
  })
})

//goes to contacts page
//clicking delete button
//testing for removed element
