<?php

namespace App\Http\Resources\User;

use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $permissionArr = [];
        $permissions = $this->getAllPermissions();

        foreach ($permissions as $permission) {
            array_push($permissionArr, $permission->id);
        }

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'password' => 'password',
            'permissions' => $permissionArr
        ];
    }
}
