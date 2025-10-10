import{f as I,j as t,l as k,S as w,hE as j,hP as u,hQ as x}from"./iframe-BgMEyBOw.js";import{w as m,c as A}from"./ContextDecorators-BQR2C376.js";import{K as b}from"./schema.zod-CndSGKHI.js";import{u as y}from"./useKandidatlisteForEier-lmC5B8E4.js";import{R as T,F as _,A as N}from"./FullførtStilling-DCy7OEo2.js";import{K as g,I as v}from"./KandidatTyper-CkRsvxsW.js";import{T as E}from"./TilgangskontrollForInnhold-CI9_GvDI.js";import"./preload-helper-BWMAHTUm.js";import"./KandidatlisteContext-BB8zXL-X.js";import"./OrganisasjonsnummerAlert-BCWEq8UM.js";import"./VStack-UU3jl9Ja.js";import"./BasePrimitive-R1dwLZrY.js";import"./List-Dber_rM4.js";import"./Link-yB4QutwC.js";import"./KandidatHendelseTag-CeV_QMPr.js";import"./Tag-B6UGrW1v.js";import"./FileXMark-B_uorPd8.js";import"./Trash-7Fs5dgHD.js";import"./HandShakeHeart-D-9O9Vx_.js";import"./Calendar-CwaqC0M5.js";import"./ThumbUp-Cgu-bFYT.js";import"./Table-V3muIp_l.js";import"./util-D0AmwIr_.js";import"./format-DrrAGn9F.js";import"./match-BHTYdbS3.js";import"./parseISO-Dei-hLif.js";import"./parse-C_zuhUlz.js";import"./getDefaultOptions-CTpR1hvo.js";import"./util-D49phOLu.js";import"./kandidat.mock-CxMq9CZf.js";import"./innsatsgrupper-BqldBv0r.js";import"./index-Bl1X_brB.js";import"./oppdaterStilling-B2wboYS-.js";import"./Box-D_MFaWfV.js";import"./EyeSlash-D5Go3Cu3.js";import"./CircleSlash-BcHIgt5f.js";import"./Modal-BYLl8Pr3.js";import"./floating-ui.react-DBIgfcER.js";import"./Date.Input-B-XhQLT9.js";import"./useFormField-Bp_i8G6K.js";import"./useControllableState-q6FKqWzx.js";import"./ChevronDown-DgJvjKl7.js";import"./Modal.context-D-Q3Jf-p.js";import"./Checkbox-DgXl4BgK.js";import"./Fieldset-DcMrSpoW.js";import"./Pencil-Dg8Fqo8_.js";import"./ClockDashed-BznWrsyh.js";import"./PersonChat-CSNx94mj.js";import"./Tasklist-DdpPWLI7.js";import"./accordion-CdjHegPg.js";import"./index-D40Z6Inm.js";import"./index-C-sD3ZkI.js";import"./index-BV_xGMQb.js";import"./Bell-B41_s5_S.js";import"./Eye-BMWnO38G.js";import"./ProgressBar-3IV2kWqO.js";import"./ErrorBoundary-Dpcs9j0Y.js";function n({dropDown:r}){const{stillingsData:i,erEier:D}=I(),d=y(i,D),c=d.error;return c?.status===404||c?.message?.includes("404")||c&&!d.isLoading?t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:t.jsx(T,{})}):t.jsx(E,{skjulVarsel:!0,kreverEnAvRollene:[k.AD_GRUPPE_REKRUTTERINGSBISTAND_ARBEIDSGIVERRETTET],children:i.stilling.publishedByAdmin===null?t.jsx(T,{}):t.jsx(w,{hooks:[d],children:e=>{const F=e.status===b.Lukket&&i.stilling.status===j.Stoppet,f=i.stilling?.properties?.positioncount&&Number(i.stilling?.properties?.positioncount)||1,K=e?.kandidater.filter(s=>s.utfallsendringer.some(R=>R.sendtTilArbeidsgiversKandidatliste===!0)).length??0,B=e?.kandidater.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,h=e.formidlingerAvUsynligKandidat.filter(s=>s.utfall===g.FATT_JOBBEN).length??0,S=B+h;return F?t.jsx(_,{dropDown:r,totalStillinger:f,antallFåttJobben:S}):t.jsx(N,{antallFåttJobben:S,antallDelt:K,totalStillinger:f,dropDown:r})}})})}n.__docgenInfo={description:"",methods:[],displayName:"FremdriftspanelStilling",props:{dropDown:{required:!1,tsType:{name:"boolean"},description:""}}};const Gt={tags:["autodocs"],component:n},l={render:()=>m(()=>t.jsx(n,{dropDown:!1}))},o={render:()=>m(()=>t.jsx(n,{dropDown:!0}))},a={render:()=>{const r={...u,stilling:{...u.stilling,status:"INACTIVE",publishedByAdmin:u.stilling.publishedByAdmin||new Date().toISOString()}},i=A({lukket:!0,antall:4,status:v.AKTUELL,utfall:g.FATT_JOBBEN,stillingsData:r});return m(()=>t.jsx(n,{dropDown:!1}),i,r)}},p={render:()=>{const r=x,i=A({stillingsData:r,antall:2});return m(()=>t.jsx(n,{dropDown:!0}),i,r)}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
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
