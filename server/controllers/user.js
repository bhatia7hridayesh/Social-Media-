import User from "../models/User.js";


export const getUser = async (req, res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);
        res.status(200).json(user);
    }catch(err){
        res.status(404).json({error: err.message})
    }
}

export const getUserFriends = async(req,res) => {
    try{
        const {id} = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const resData = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
            return {_id, firstName, lastName, occupation, location, picturePath}
        });
        res.status(200).json(resData);

    }catch(err){
        res.status(404).json({error: err.message})
    }
    
}

export const addRemoveFriend = async (req, res) => {
    try{
        const {id , friendid} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendid);

        if(user.friends.includes(friendid)){
            user.friends = user.friends.filter((id) => id !== friendid);
            friend.friends = friend.friends.filter((friendid) => friendid !== id)
        }else{
            user.friends = user.friends.push(friendid);
            friend.friends = friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const resData = friends.map(
            ({_id, firstName, lastName, occupation, location, picturePath}) =>{
            return {_id, firstName, lastName, occupation, location, picturePath}
        });
        res.status(200).json(resData);
    }catch(err){
        res.status(404).json({error: err.message})
    }
}