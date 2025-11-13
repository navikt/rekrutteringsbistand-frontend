import{aE as I,M as w,j as t,q as k,S as x,cx as j,cF as b,cE as g,cy as u,P as y,cU as _}from"./iframe-D36rECNd.js";import{w as m,c as A}from"./ContextDecorators-DvpPUn6o.js";import{F as N,A as v}from"./FullførtStilling-CXewYAnc.js";import{R as T}from"./GjenåpneStillingKnapp-tyHNEHzA.js";import{T as E}from"./TilgangskontrollForInnhold-3a3GqWPl.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-Dq0o6vNi.js";import"./OrganisasjonsnummerAlert-DjNjCHpd.js";import"./VStack-vlL2a3-1.js";import"./BasePrimitive-CsZRqtO4.js";import"./List-Dbmh8xVI.js";import"./Link-B8R0tkWb.js";import"./KandidatHendelseTag-DFOw4G4q.js";import"./Tag-Bc2qo3WD.js";import"./ChatExclamationmark-Ba8iKWqc.js";import"./FileXMark-NFwVFiz9.js";import"./Trash-DPEYqurP.js";import"./HandShakeHeart-CIPt3blb.js";import"./Calendar-D34si2k-.js";import"./ThumbUp-Cw11vHuf.js";import"./Table-BMinlwuP.js";import"./util-uRUzvd7T.js";import"./parse-BvzsN-no.js";import"./getDefaultOptions-BlGED2ny.js";import"./parseISO-D8g9glIl.js";import"./index-DirQeSrQ.js";import"./index-B40KJ5b4.js";import"./isBefore-BnhTsP5z.js";import"./util-AnFGb_gx.js";import"./accordion-CEflLEo0.js";import"./index-BGyaRA83.js";import"./index-DudkLQGU.js";import"./index-B1SpLRNw.js";import"./ChevronDown-O8MvsOkm.js";import"./Box-BwguClco.js";import"./Bell-Dw5SzYPX.js";import"./PersonChat-B7a-j7P5.js";import"./Eye-C55Th_tr.js";import"./ProgressBar-B2dHmUxq.js";import"./EyeSlash-B5mQG7nn.js";import"./CircleSlash-DrLDKyVR.js";import"./Modal-Bp-GQATU.js";import"./floating-ui.react-Cwl-MhBg.js";import"./Date.Input-_3ypxCdT.js";import"./useFormField-B2iVjPpq.js";import"./useControllableState-BKO9CC8z.js";import"./Modal.context-CGOHahkN.js";import"./Checkbox-QTAfQQnY.js";import"./Fieldset-BJieV3u0.js";import"./Pencil-Dkuo70J7.js";import"./PersonbrukerTekst-Cx9chjFM.js";import"./ClockDashed-CVFqCvbM.js";import"./Tasklist-Faa_-TMr.js";import"./ErrorBoundary-jeYL3x_e.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=w(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===b.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Lt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:y.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Lt as default};
