import{av as I,V as w,j as t,p as k,S as b,cb as j,cf as x,ch as g,cc as u,Y as y,cv as _}from"./iframe-YU0gJw2_.js";import{w as m,c as D}from"./ContextDecorators-Pwj8uDdC.js";import{F as v,A as N}from"./FullførtStilling-CKYTzBjI.js";import{R as T}from"./GjenåpneStillingKnapp-iAg9_DJO.js";import{T as A}from"./TilgangskontrollForInnhold-CVMEaU-k.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-vXZ7kztJ.js";import"./OrganisasjonsnummerAlert-D-DxXPkH.js";import"./VStack-CjJaDInz.js";import"./BasePrimitive-Byl2zsu_.js";import"./List-Bj2jn7SK.js";import"./Link-Ccy4hlVd.js";import"./KandidatHendelseTag--Je9UtK3.js";import"./Tag-Bfc_NhQs.js";import"./ChatExclamationmark-Dq4Mbf-P.js";import"./FileXMark-DrbwU584.js";import"./Trash-BSo73oLS.js";import"./HandShakeHeart-DYHu2acl.js";import"./Calendar-Cc_h6ZHR.js";import"./ThumbUp-DAA6TZWC.js";import"./Table-Buifw8cO.js";import"./util-BZYWqHW1.js";import"./format-ByhkG4B0.js";import"./match-BiwrJVmm.js";import"./parse-Bq6Gunlw.js";import"./getDefaultOptions-YSejoEQ9.js";import"./parseISO-CT8HtoSq.js";import"./index-B4eQgjN8.js";import"./index-B40KJ5b4.js";import"./isBefore-BqSNINgW.js";import"./util-DTO6kuK0.js";import"./accordion-BpQ5zSNe.js";import"./index-8viLu7jC.js";import"./index-g7yWOEbc.js";import"./index-C-_G9Hfd.js";import"./ChevronDown-DPjIL07A.js";import"./Box-WuO_Te3W.js";import"./Bell-CNnl6wB-.js";import"./PersonChat-gJnuxfwr.js";import"./Eye-B95CYdZJ.js";import"./ProgressBar-DpVi058r.js";import"./EyeSlash-4x55nVZk.js";import"./CircleSlash--vW-hJPm.js";import"./Modal-D-5sWnQR.js";import"./floating-ui.react-B-ydokDH.js";import"./Date.Input-BkqaKlYr.js";import"./ReadOnlyIcon-D_aSptLZ.js";import"./useFormField-DFqPKRWn.js";import"./useControllableState-CZk7ILKn.js";import"./Modal.context-DZ6x1Rgu.js";import"./Checkbox-CIO5bRzJ.js";import"./Fieldset-BUPHUutV.js";import"./Pencil-Bq3nk9mI.js";import"./PersonbrukerTekst-M9gj-igZ.js";import"./ClockDashed-KGzjV2vj.js";import"./Tasklist-f6IFXIn5.js";import"./ErrorBoundary-DpNsSgKc.js";function n({dropDown:r}){const{stillingsData:i,erEier:E}=I(),d=w(i,E),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(A,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(b,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===x.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(v,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(N,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Gt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=D({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=D({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />)
}`,...l.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  render: () => withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />)
}`,...o.parameters?.docs?.source}}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  render: () => {
    // Lukket kandidatliste og stoppet stilling -> Fullført visning
    const stillingsData = {
      ...mockBaseStilling,
      stilling: {
        ...mockBaseStilling.stilling,
        status: 'INACTIVE',
        publishedByAdmin: mockBaseStilling.stilling.publishedByAdmin || new Date().toISOString()
      }
    } as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      lukket: true,
      antall: 4,
      status: InternKandidatstatus.AKTUELL,
      utfall: KandidatutfallTyper.FATT_JOBBEN,
      stillingsData
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown={false} />, liste, stillingsData);
  }
}`,...a.parameters?.docs?.source}}};p.parameters={...p.parameters,docs:{...p.parameters?.docs,source:{originalSource:`{
  render: () => {
    const stillingsData = mockFormidling as typeof mockBaseStilling;
    const liste = createKandidatlisteMock({
      stillingsData,
      antall: 2
    });
    return withStillingsKandidatliste(() => <FremdriftspanelStilling dropDown />, liste, stillingsData);
  }
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Gt as default};
