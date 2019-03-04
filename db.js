var crypto=require('crypto');

module.exports = function(){
    return{
        userList: [],
        save: function(user){
            user.id=crypto.randomBytes(20).toString("hex");
            this.userList.push(user);
            return 1;
        },
        find: function(id){
            if(id){
                return this.userList.find(function(element){
                    return element.id===id;
                });
            }else{
                return this.userList;
            }
        },
        findOne: function(name){
            if(name){
                return this.userList.find(function(element){
                    return element.username=name;
                })
            }else{
                return this.userList;
            }
        }

    }
}
