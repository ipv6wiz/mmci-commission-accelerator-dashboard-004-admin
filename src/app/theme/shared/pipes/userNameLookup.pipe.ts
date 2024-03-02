import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../service';
import { lastValueFrom } from 'rxjs';
import { ApiResponse } from '../dtos/api-response.dto';


@Pipe({
  standalone: true,
  name: 'userNameLookup'
})
export class UserNameLookupPipe implements PipeTransform {
  constructor(private userService: UserService) {
  }
   async transform(userId: string): Promise<string> {
    return await lastValueFrom(this.userService.getUserName(userId)).then((response: ApiResponse) => {
       if(response.statusCode === 200){
         return response.data;
       } else {
         return 'User Not found';
       }
     })


  }
}
