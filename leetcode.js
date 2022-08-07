

var isValidBST = function(root)
 {
    function recursiv(root,min,max)
    {
        
        if(root === null)
        {
            return true;
        }
        if((root.val >= max || root.val <= min))
        {
            return false;
        }
        
        return recursiv(root.left,min,root.val) && recursiv(root.right, root.val, max);
        
    }
    return recursiv(root,-Infinity, Infinity)
};
