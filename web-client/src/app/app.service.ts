import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { map } from 'rxjs';
import { BASE_URL } from './core/tokens/base-url.token';
import { GrafanaHttpResponse } from './models/grafana-http-response.model';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private readonly baseUrl = inject(BASE_URL);
  private readonly http = inject(HttpClient);

  getTemperature() {
    return this.http
      .post<GrafanaHttpResponse>(
        `${this.baseUrl}/api/ds/query`,
        {
          queries: [
            {
              datasource: {
                type: 'influxdb',
                uid: 'adoyfypst15ogc',
              },
              groupBy: [
                {
                  params: ['$__interval'],
                  type: 'time',
                },
                {
                  params: ['null'],
                  type: 'fill',
                },
              ],
              hide: false,
              measurement: 'reactor_data',
              orderByTime: 'ASC',
              policy: 'default',
              refId: 'A',
              resultFormat: 'time_series',
              select: [
                [
                  {
                    params: ['pressure'],
                    type: 'field',
                  },
                  {
                    params: [],
                    type: 'mean',
                  },
                ],
              ],
              tags: [],
              adhocFilters: [],
              query: '',
              rawSql: '',
              alias: '',
              limit: '',
              slimit: '',
              tz: '',
              datasourceId: 1,
              intervalMs: 10000,
              maxDataPoints: 1048,
            },
          ],
          from: `${+new Date() - 5 * 60 * 1000}`,
          to: `${+new Date()}`,
        },
        {
          headers: {
            Authorization: `Bearer xxx`,
          },
        }
      )
      .pipe(map((response) => response.results.A));
  }
}
