/*jshint esversion: 6 */
function addTask(){
 var taskName = document.querySelector("#task").value;
   var taskListUI = ` <li class="checklist-entry list-group-item flex-column align-items-start py-4 px-4">
                        <div class="checklist-item checklist-item-success checklist-item-checked">
                            <div class="checklist-info">
                                <h5 data-type="header" class="checklist-title mb-0">${taskName}</h5>
                            </div>
                            <div>
                                <div class="custom-control custom-checkbox custom-checkbox-success"><input id="${taskName}" type="checkbox"  class="custom-control-input" /><label for="${taskName}"
                                        class="custom-control-label"></label></div>
                            </div>
                        </div>
                    </li>`
 var todoList = document.querySelector('.todo-list');
   todoList.insertAdjacentHTML('beforeend',taskListUI);
}
