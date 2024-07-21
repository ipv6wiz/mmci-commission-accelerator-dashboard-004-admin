import { DataManager, DataResult, UrlAdaptor } from '@syncfusion/ej2-data';
import { AuthenticationService } from '../service';
import { inject } from '@angular/core';

export class KanbanAdaptorClass extends UrlAdaptor{
  private authService: AuthenticationService = inject(AuthenticationService)

  public override beforeSend(dm: DataManager, request: Request) {

    super.beforeSend(dm, request);
  }

  public override processResponse(dataResult: DataResult, ): DataResult {
    console.log('------> KanbanAdaptorClass - processResponse - data: ', dataResult);
    // @ts-expect-error property not found
    const results = dataResult.data.results;
    // @ts-expect-error property not found
    const count = dataResult.data.count;
    const newData: DataResult = {
      count,
      results
    };
    console.log('------> KanbanAdaptorClass - processResponse - newData: ', newData);
    return super.processResponse(newData);
  }
}
