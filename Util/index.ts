/*
Name: Andre Agrippa
Date: 04/14/2020
Purpose: Adds site functionality for display name and authentication guard
*/
import express, {Request, Response, NextFunction} from 'express';

//Helper function
export function UserDisplayName(req: Request): string
{
    if(req.user)
    {
        let user = req.user as UserDocument;
        return user.displayName.toString();
    }
    return '';
}

export function AuthGuard(req: Request, res: Response, next: NextFunction):void
{
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}
