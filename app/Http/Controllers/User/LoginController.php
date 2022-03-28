<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\LoginRequest;
use App\Http\Resources\User\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function __invoke(LoginRequest $request)
    {
        $request = $request->validated();
        $user = User::where('email', $request['email'])->first();

        if($user) {
            if (Hash::check($request['password'], $user->password)) {
                return new UserResource($user);
            } else {
                return response()->json(['data'=> ['login' => false, 'message' => 'Пароль не верный']], 200);
            }
        } else {
            return response()->json(['data'=> ['login' => false, 'message' => 'Пользователь не найден']], 200);
        }
    }
}
