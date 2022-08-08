

var isValidBST = function(node)
{
    function recursive(node,minimum,maximum)
    {

        if(node === null)
        {
            return true;
        }
        if((node.val >= maximum || node.val <= minimum))
        {
            return false;
        }
        
        return recursive(node.left,minimum,node.val) && recursive(node.right, node.val, maximum);
        
    }
    return recursive(node,-Infinity, Infinity)
};