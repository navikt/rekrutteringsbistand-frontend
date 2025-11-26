import{aw as w,U as I,j as t,y as k,S as x,cx as j,cF as y,cE as g,cy as u,Y as b,cZ as _}from"./iframe-Djf0aaCu.js";import{w as m,c as A}from"./ContextDecorators-Bz_tf06c.js";import{F as N,A as v}from"./FullførtStilling-Dn-5zGoW.js";import{R as T}from"./GjenåpneStillingKnapp-okfDhakc.js";import{T as E}from"./TilgangskontrollForInnhold-JBg2kVLF.js";import"./preload-helper-PPVm8Dsz.js";import"./KandidatlisteContext-DlK2m225.js";import"./OrganisasjonsnummerAlert-DEBjV0z0.js";import"./VStack-BGsDIkWS.js";import"./BasePrimitive-CSUIcWuf.js";import"./List-DhIUy4Ha.js";import"./Link-C7h0FEQb.js";import"./KandidatHendelseTag-DJib85Pq.js";import"./Tag-DEoThWTs.js";import"./ChatExclamationmark-DB8kfSnV.js";import"./FileXMark-CvsleZFt.js";import"./Trash-BQ_83vSR.js";import"./HandShakeHeart-D7g3P2SO.js";import"./Calendar-B2vIp9Z6.js";import"./ThumbUp-DINwWRPg.js";import"./Table-DoFaPu74.js";import"./index-CaC8I_UC.js";import"./index-B40KJ5b4.js";import"./util-B2PQqqnM.js";import"./DatoVelger-nx-w-4VP.js";import"./useDatepicker-BdmXLbIn.js";import"./useControllableState-DRurQPnd.js";import"./Modal-sEzJaJhM.js";import"./floating-ui.react-0NnofmAD.js";import"./Date.Input-DJ-gGXjF.js";import"./useFormField-D-dph_0E.js";import"./ChevronDown-k3UIUZgA.js";import"./owner-CO0wgQ-G.js";import"./useClientLayoutEffect-CRL3UlMw.js";import"./Modal.context-Ak7lim11.js";import"./Popover-Cjl6W7EX.js";import"./DismissableLayer-5bSw7yqi.js";import"./startOfMonth-DRpALOfC.js";import"./Select-05WFEovf.js";import"./endOfMonth-B7Us56Ed.js";import"./ArrowLeft-4OxWQ6hC.js";import"./ArrowRight-CBI0rlwB.js";import"./isSameDay-BsgEIkzB.js";import"./Checkbox-CTvypucO.js";import"./Fieldset-DOh6dnhn.js";import"./accordion-Bclafom8.js";import"./index--xeq4N00.js";import"./index-eVSQkkcc.js";import"./index-DzDq2d71.js";import"./Box-D6MaWCbU.js";import"./Bell-CNa38wXe.js";import"./PersonChat-CxeXVhm1.js";import"./Eye-DK-DwBPL.js";import"./ProgressBar-DwgSidRH.js";import"./useLatestRef-Bf9MrB6D.js";import"./EyeSlash-BAsRQSO_.js";import"./CircleSlash-BF81C3W_.js";import"./Pencil-BjpW2G8O.js";import"./FullførStillingModal-Bxtx7FOa.js";import"./PersonbrukerTekst-BiZshSUh.js";import"./ClockDashed-l8JS1Vw2.js";import"./umamiEvents-CYDHrNFb.js";import"./Tasklist-BoAyqGaN.js";import"./ErrorBoundary-1r_8Tjnz.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=w(),d=I(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(x,{hooks:[d],children:e=>{const F=e.status===j.Lukket&&i.stilling.status===y.Stoppet,S=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,B=e?.kandidater.filter(s=>s.utfallsendringer.some(h=>h.sendtTilArbeidsgiversKandidatliste===!0)).length??0,K=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,R=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,f=K+R;return F?t.jsx(N,{dropDown:r,totalStillinger:S,antallFåttJobben:f}):t.jsx(v,{antallFåttJobben:f,antallDelt:B,totalStillinger:S,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Wt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:b.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=_,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
}`,...p.parameters?.docs?.source}}};export{l as Aktiv,o as AktivDropdown,p as FormidlingVariant,a as Fullført,Wt as default};
