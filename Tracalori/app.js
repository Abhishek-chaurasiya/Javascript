
//Storage controller

//item controller
const ItemCtrl =(function(){
    //Item constructor
    const Item = function(id,name,calories){
        this.id = id;
        this.name = name;
        this.calories = calories ;
    }
    //Data structure /state
    const data ={
        Items:[
            // {id:0, name : 'steak dinner',calories:1200},
            // {id:1, name : 'eggs',calories:800}
        ],
        currentItem : null,
        totalCalories: 0
    }
    return {
        getItems : function(){
            return data.Items;
        },
        logData :function(){
            return data;
        },
        addItem :function(name,calories){
            let ID ;
            //create id
            if(data.Items.length > 0){
              ID =data.Items[data.Items.length -1].id+1;
            }else{
              ID = 0;
            }
          
            // calories to number
            calories =parseInt(calories);

            // create new item
            newItem = new Item(ID,name,calories);

            data.Items.push(newItem);
            return newItem;
        },
        getTotalCalories:function(){
            let total = 0;
            data.Items.forEach(function(item){
                total += item.calories;
            })
            data.totalCalories = total;
            
            return data.totalCalories;
        },
        getItemById:function(id){
            let found = null;
            data.Items.forEach(function(item){
              if(item.id === id){
                found = item;
              }
            })
            
            return found;
        },
        setCurrentItem:function(item){
            data.currentItem = item;
        },
        getCurrentItem:function(){
            return data.currentItem;
        },
        updateItem : function(name, calories){
          calories = parseInt(calories);

          let found = null;

          data.Items.forEach(function(item){
            if(item.id === data.currentItem.id){
                item.name = name;
                item.calories= calories;
                found = item;
            }
          });
          return found;
        },
        deleteItem : function(id){
           // get ids
           const ids = data.Items.map((item)=>{
             return item.id;
           });

           // get index
           const index = ids.indexOf(id);

           //remove item
           data.Items.splice(index,1);
        }
    }

})();


//Ui controller
const UICtrl =(function(){
    const UISelectors ={
        itemList :'#item-list',
        listItems : '#item-list li',
        addBtn : '.add-btn',
        updateBtn : '.update-btn',
        deleteBtn : '.delete-btn',
        backBtn : '.back-btn',
        itemNameInput : '#item-name',
        itemCaloriesInput : '#item-calories',
        totalCalories : '.total-calories'
    }

    return {
        populateItemList:function(Items){
           let html = '';
           Items.forEach(function(item){
             html += `<li class="collection-item" id="item-${item.id}">
             <strong> ${item.name} : </strong> <em> ${item.calories}Calorie</em>
             <a href="#" class="secondary-content">
                 <i class=" edit-item fa fa-pencil"></i>
             </a>
         </li>`
           })
           
           //Insert list items
           document.querySelector(UISelectors.itemList).innerHTML =html;
        },
        getSelectors:function(){
            return UISelectors;
        },
        getItemInput:function(){
            return{
                name:document.querySelector(UISelectors.itemNameInput).value,
                calories:document.querySelector(UISelectors.itemCaloriesInput).value
            }
        },
        addListItem:function(item){
            //create a li element 
            const li = document.createElement('li');
            //add class
            li.className = 'collection-item';
            //add id
            li.id = `item-${item.id}`;
            //add html
            li.innerHTML = ` <strong> ${item.name} : </strong> <em> ${item.calories} Calorie</em>
            <a href="#" class="secondary-content">
                <i class=" edit-item fa fa-pencil"></i>
            </a>`;
            //insert item 
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearInput:function(){
            document.querySelector(UISelectors.itemNameInput).value = '';
            document.querySelector(UISelectors.itemCaloriesInput).value = '';
        },
        showTotalCalories:function(totalCalories){
           document.querySelector(UISelectors.totalCalories).innerHTML= totalCalories;
        },
        clearEditState :function(){
            UICtrl.clearInput();
            document.querySelector(UISelectors.updateBtn).style.display = 'none',
            document.querySelector(UISelectors.deleteBtn).style.display = 'none',
            document.querySelector(UISelectors.backBtn).style.display = 'none',
            document.querySelector(UISelectors.addBtn).style.display = 'inline'
        },
        addItemToForm:function(){
            document.querySelector(UISelectors.itemNameInput).value = ItemCtrl.getCurrentItem().name;
            document.querySelector(UISelectors.itemCaloriesInput).value = ItemCtrl.getCurrentItem().calories;

            UICtrl.showEditState();
        },
        showEditState:function(){
            document.querySelector(UISelectors.updateBtn).style.display = 'inline',
            document.querySelector(UISelectors.deleteBtn).style.display = 'inline',
            document.querySelector(UISelectors.backBtn).style.display = 'inline',
            document.querySelector(UISelectors.addBtn).style.display = 'none'
        },
        updateListItem:function(item){
          let listItem = document.querySelectorAll(UISelectors.listItems);

          // Turn node list into array
          listItem = Array.from(listItem);

          listItem.forEach(function(listItem){
             const  itemID = listItem.getAttribute('id');
             
             if(itemID === `item-${item.id}`){
                document.querySelector(`#${itemID}`).innerHTML=`<strong> ${item.name} : </strong> <em> ${item.calories} Calorie</em>
                <a href="#" class="secondary-content">
                    <i class=" edit-item fa fa-pencil"></i>
                </a>`
             }
          })

        },
        deleteListItem:function(id){
           const itemID = `#item-${id}`;
           const item = document.querySelector(itemID);
           item.remove();
        }
    }

})();


//App  controller
const App =(function(ItemCtrl,UICtrl){
   //Load event listener
   const loadEventListeners =function(){
      const UISelectors =UICtrl.getSelectors();

      //Add item event
       document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

       //disable submit on enter
       document.addEventListener('keypress',function(e){
        if(e.key ===13){
            e.preventDefault();
            return false;
        }
       })

       // edit icon click event
       document.querySelector(UISelectors.itemList).addEventListener('click',itemEditClick);

       //update item event 
       document.querySelector(UISelectors.updateBtn).addEventListener('click',itemUpdateSubmit);

        //update item event 
        document.querySelector(UISelectors.deleteBtn).addEventListener('click',itemDeleteSubmit);

       //back button event 
       document.querySelector(UISelectors.backBtn).addEventListener('click',UICtrl.clearEditState);
   }   
   
    const itemAddSubmit = function(e){
        // get form input from ui controller    
        const input = UICtrl.getItemInput();
        
        //check for name and calorie input
        if(input.name !== '' && input.calories !== ''){
            //add item
            const newItem = ItemCtrl.addItem(input.name,input.calories);
            //add item to ui list
            UICtrl.addListItem(newItem);
             //get total calories
           const totalCalories = ItemCtrl.getTotalCalories();
           // add total calories to ui
           UICtrl.showTotalCalories(totalCalories);
           
            //clear field
            UICtrl.clearInput();
        }
        e.preventDefault();
    }

    //click edit item
    const itemEditClick = function(e){
        
        if(e.target.classList.contains('edit-item')){
            // get list item id (item - 0 item -1)
            const listId = e.target.parentNode.parentNode.id;
            
            // break into an array
            const listIdArr = listId.split('-');
            
            //get the actual id
            const id = parseInt(listIdArr[1]);

            //get item
            const itemToEdit = ItemCtrl.getItemById(id);
           
            //set current item
            ItemCtrl.setCurrentItem(itemToEdit);

            // add item to form
            UICtrl.addItemToForm();
        }

        e.preventDefault();
    }
    // update item submit
    const itemUpdateSubmit = function(e){
       
        // get item input
        const input = UICtrl.getItemInput();

        // update item
        const updatedItem = ItemCtrl.updateItem(input.name,input.calories);
          
        // update ui
        UICtrl.updateListItem(updatedItem);

         //get total calories
         const totalCalories = ItemCtrl.getTotalCalories();
         // add total calories to ui
         UICtrl.showTotalCalories(totalCalories);

         UICtrl.clearEditState();

        e.preventDefault();
    }

    const itemDeleteSubmit = function(e){
        
        // get current item
        const currentItem = ItemCtrl.getCurrentItem();

        //delte from data structure
        ItemCtrl.deleteItem(currentItem.id);

        // delete form ui
        UICtrl.deleteListItem(currentItem.id);

        //get total calories
        const totalCalories = ItemCtrl.getTotalCalories();
        // add total calories to ui
        UICtrl.showTotalCalories(totalCalories);

        UICtrl.clearEditState();
        
        e.preventDefault();
    }

    return{
        init: function(){
          //edit state // set initial state
          UICtrl.clearEditState();

          //Fetch items from data structure
          const items = ItemCtrl.getItems();
           
          //Populate list with items
          UICtrl.populateItemList(items);

           //get total calories
           const totalCalories = ItemCtrl.getTotalCalories();
           // add total calories to ui
           UICtrl.showTotalCalories(totalCalories);

          //load event listener
          loadEventListeners();
        }
        
    }

})(ItemCtrl,UICtrl);

App.init();